import {
  CandidateNominated as CandidateNominatedEvent,
  CouncilMemberAdded as CouncilMemberAddedEvent,
  CouncilMemberRemoved as CouncilMemberRemovedEvent,
  CouncilMembersDismissed as CouncilMembersDismissedEvent,
  ElectionBatchEvaluated as ElectionBatchEvaluatedEvent,
  ElectionEvaluated as ElectionEvaluatedEvent,
  ElectionModuleInitialized as ElectionModuleInitializedEvent,
  EmergencyElectionStarted as EmergencyElectionStartedEvent,
  EpochScheduleUpdated as EpochScheduleUpdatedEvent,
  EpochStarted as EpochStartedEvent,
  NominationWithdrawn as NominationWithdrawnEvent,
  VoteRecorded as VoteRecordedEvent,
} from '../generated/ElectionModule/ElectionModule';
import {
  VoteRecorded as VoteRecordedOldEvent,
  VoteWithdrawn as VoteWithdrawnOldEvent,
  NominationWithdrawn as NominationWithdrawnOldEvent,
  CandidateNominated as CandidateNominatedOldEvent,
} from '../generated/Spartan/ElectionModuleOld';
import {
  CandidateNominated,
  CouncilMemberAdded,
  CouncilMemberRemoved,
  CouncilMembersDismissed,
  ElectionBatchEvaluated,
  ElectionEvaluated,
  ElectionModuleInitialized,
  EmergencyElectionStarted,
  EpochScheduleUpdated,
  EpochStarted,
  NominationWithdrawn,
  VoteRecorded,
  VoteOld,
  VoteResultOld,
  User,
} from '../generated/schema';
import { store, BigInt, log } from '@graphprotocol/graph-ts';

// Old Subgraph handlers

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);

export function handleCandidateNominatedOld(event: CandidateNominatedOldEvent): void {
  let user = User.load(event.params.candidate.toHexString());
  if (user) {
    user.nominationCount = user.nominationCount.plus(ONE_BI);
  } else {
    user = new User(event.params.candidate.toHexString());
    user.nominationCount = ONE_BI;
    user.nominationWithdrewCount = ZERO_BI;
    user.votingCount = ZERO_BI;
    user.votingWithdrewCount = ZERO_BI;
  }
  user.save();
}

export function handleNominationWithdrawnOld(event: NominationWithdrawnOldEvent): void {
  let user = User.load(event.params.candidate.toHexString());
  if (user) {
    user.nominationWithdrewCount = user.nominationWithdrewCount.plus(ONE_BI);
    user.save();
  } else {
    log.critical('user withdrew without being nominated', [event.params.candidate.toHexString()]);
  }
}

export function handleVoteRecordedOld(event: VoteRecordedOldEvent): void {
  let id = event.params.voter
    .toHexString()
    .concat('-')
    .concat(event.address.toHexString())
    .concat('-')
    .concat(event.params.epochIndex.toString());

  let voteRecord = new VoteOld(id);
  let votePower = BigInt.fromString(event.params.votePower.toString());

  voteRecord.ballotId = event.params.ballotId;
  voteRecord.epochIndex = event.params.epochIndex.toString();
  voteRecord.voter = event.params.voter.toHexString();
  voteRecord.votePower = votePower;
  voteRecord.contract = event.address.toHexString();
  voteRecord.save();

  let resultId = event.params.ballotId
    .toHexString()
    .concat('-')
    .concat(event.params.epochIndex.toString());
  let result = VoteResultOld.load(resultId);
  if (result == null) {
    result = new VoteResultOld(resultId);
    result.votePower = BigInt.fromString('0');
    result.voteCount = BigInt.fromString('0');
    result.ballotId = event.params.ballotId;
    result.epochIndex = event.params.epochIndex.toString();
    result.contract = event.address.toHexString();
  }
  result.votePower = result.votePower.plus(votePower);
  result.voteCount = result.voteCount.plus(ONE_BI);
  result.save();
}

export function handleVoteWithdrawnOld(event: VoteWithdrawnOldEvent): void {
  let id = event.params.voter
    .toHexString()
    .concat('-')
    .concat(event.address.toHexString())
    .concat('-')
    .concat(event.params.epochIndex.toString());

  store.remove('Vote', id);

  let resultId = event.params.ballotId
    .toHexString()
    .concat('-')
    .concat(event.params.epochIndex.toString());
  let result = VoteResultOld.load(resultId);
  if (result !== null) {
    let votePower = BigInt.fromString(event.params.votePower.toString());
    result.votePower = result.votePower.minus(votePower);
    result.voteCount = result.voteCount.minus(ONE_BI);
    if (result.voteCount === ZERO_BI) {
      store.remove('VoteResult', resultId);
    } else {
      result.save();
    }
  }
}

// End of old Subgraph handlers

export function handleCandidateNominated(event: CandidateNominatedEvent): void {
  let entity = new CandidateNominated(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.candidate = event.params.candidate;
  entity.epochId = event.params.epochId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCouncilMemberAdded(event: CouncilMemberAddedEvent): void {
  let entity = new CouncilMemberAdded(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.member = event.params.member;
  entity.epochIndex = event.params.epochIndex;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCouncilMemberRemoved(event: CouncilMemberRemovedEvent): void {
  let entity = new CouncilMemberRemoved(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.member = event.params.member;
  entity.epochIndex = event.params.epochIndex;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCouncilMembersDismissed(event: CouncilMembersDismissedEvent): void {
  let entity = new CouncilMembersDismissed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.dismissedMembers = event.params.dismissedMembers;
  entity.epochId = event.params.epochId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleElectionBatchEvaluated(event: ElectionBatchEvaluatedEvent): void {
  let entity = new ElectionBatchEvaluated(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.epochId = event.params.epochId;
  entity.numEvaluatedBallots = event.params.numEvaluatedBallots;
  entity.totalBallots = event.params.totalBallots;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleElectionEvaluated(event: ElectionEvaluatedEvent): void {
  let entity = new ElectionEvaluated(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.epochId = event.params.epochId;
  entity.ballotCount = event.params.ballotCount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleElectionModuleInitialized(event: ElectionModuleInitializedEvent): void {
  let entity = new ElectionModuleInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEmergencyElectionStarted(event: EmergencyElectionStartedEvent): void {
  let entity = new EmergencyElectionStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.epochId = event.params.epochId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEpochScheduleUpdated(event: EpochScheduleUpdatedEvent): void {
  let entity = new EpochScheduleUpdated(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.epochId = event.params.epochId;
  entity.startDate = event.params.startDate;
  entity.endDate = event.params.endDate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleEpochStarted(event: EpochStartedEvent): void {
  let entity = new EpochStarted(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.epochId = event.params.epochId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNominationWithdrawn(event: NominationWithdrawnEvent): void {
  let entity = new NominationWithdrawn(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.candidate = event.params.candidate;
  entity.epochId = event.params.epochId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVoteRecorded(event: VoteRecordedEvent): void {
  let entity = new VoteRecorded(event.transaction.hash.concatI32(event.logIndex.toI32()));
  entity.voter = event.params.voter;
  entity.chainId = event.params.chainId;
  entity.epochId = event.params.epochId;
  entity.votingPower = event.params.votingPower;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
