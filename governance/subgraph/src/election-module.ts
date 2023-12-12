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
  CouncilMemberAdded,
  CouncilMemberRemoved,
  CouncilMembersDismissed,
  ElectionBatchEvaluated,
  ElectionEvaluated,
  ElectionModuleInitialized,
  EmergencyElectionStarted,
  EpochScheduleUpdated,
  EpochStarted,
  VoteRecorded,
  User,
  VoteResult,
} from '../generated/schema';
import { store, BigInt, log, BigDecimal } from '@graphprotocol/graph-ts';

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
    user.votingCount = ZERO_BI;
  }
  user.save();
}

export function handleNominationWithdrawnOld(event: NominationWithdrawnOldEvent): void {
  let user = User.load(event.params.candidate.toHexString());
  if (user) {
    user.nominationCount = user.nominationCount.minus(ONE_BI);
    user.save();
  } else {
    log.critical('user withdrew without being nominated {}', [
      event.params.candidate.toHexString(),
    ]);
  }
}

export function handleVoteRecordedOld(event: VoteRecordedOldEvent): void {
  let voteRecord = new VoteRecorded(
    event.params.voter
      .toHexString()
      .concat('-')
      .concat(event.address.toHexString())
      .concat('-')
      .concat('10')
      .concat('-')
      .concat(event.params.epochIndex.toString())
  );
  let votePower = BigDecimal.fromString(event.params.votePower.toString());

  voteRecord.voter = event.params.voter.toHexString();
  voteRecord.chainId = BigInt.fromI32(10);
  voteRecord.epochId = event.params.epochIndex;
  voteRecord.votePower = votePower;
  voteRecord.blockNumber = event.block.number;
  voteRecord.contract = event.address.toHexString();
  voteRecord.save();

  let user = User.load(event.params.voter.toHexString());
  if (user) {
    user.votingCount = user.votingCount.plus(ONE_BI);
  } else {
    user = new User(event.params.voter.toHexString());
    user.nominationCount = ZERO_BI;
    user.votingCount = ONE_BI;
  }
  user.save();

  let resultId = event.params.voter
    .toHexString()
    .concat('-')
    .concat('10')
    .concat('-')
    .concat(event.address.toHexString())
    .concat('-')
    .concat(event.params.epochIndex.toString());
  let result = VoteResult.load(resultId);

  if (result == null) {
    result = new VoteResult(resultId);
    result.epochId = event.params.epochIndex.toString();
    result.votePower = BigDecimal.fromString('0');
    result.voteCount = BigInt.fromI32(0);
    result.contract = event.address.toHexString();
  }
  result.votePower = result.votePower.plus(votePower);
  result.voteCount = result.voteCount.plus(ONE_BI);
  result.save();
}

export function handleVoteWithdrawnOld(event: VoteWithdrawnOldEvent): void {
  store.remove(
    'VoteRecorded',
    event.params.voter
      .toHexString()
      .concat('-')
      .concat(event.address.toHexString())
      .concat('-')
      .concat('10')
      .concat('-')
      .concat(event.params.epochIndex.toString())
  );

  let user = User.load(event.params.voter.toHexString());
  if (user) {
    user.votingCount = user.votingCount.minus(ONE_BI);
    user.save();
  }

  let resultId = event.params.voter
    .toHexString()
    .concat('-')
    .concat('10')
    .concat('-')
    .concat(event.address.toHexString())
    .concat('-')
    .concat(event.params.epochIndex.toString());
  let result = VoteResult.load(resultId);

  if (!!result) {
    result.votePower = result.votePower.minus(event.params.votePower.toBigDecimal());
    result.voteCount = result.voteCount.minus(ONE_BI);
    if (result.voteCount.equals(ZERO_BI)) {
      store.remove('VoteResult', resultId);
    } else {
      result.save();
    }
  }
}

// End of old Subgraph handlers

export function handleCandidateNominated(event: CandidateNominatedEvent): void {
  let user = User.load(event.params.candidate.toHexString());
  if (user) {
    user.nominationCount = user.nominationCount.plus(ONE_BI);
  } else {
    user = new User(event.params.candidate.toHexString());
    user.nominationCount = ONE_BI;
    user.votingCount = ZERO_BI;
  }
  user.save();
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

export function handleNominationWithdrawn(event: NominationWithdrawnEvent): void {
  let user = User.load(event.params.candidate.toHexString());
  if (user) {
    user.nominationCount = user.nominationCount.minus(ONE_BI);
    user.save();
  } else {
    log.critical('user withdrew without being nominated', [event.params.candidate.toHexString()]);
  }
}

export function handleVoteRecorded(event: VoteRecordedEvent): void {
  let id = event.params.voter
    .toHexString()
    .concat('-')
    .concat(event.address.toHexString())
    .concat('-')
    .concat(event.params.chainId.toString())
    .concat('-')
    .concat(event.params.epochId.toString());
  let voteRecord = VoteRecorded.load(id);

  let votePower = BigDecimal.fromString(event.params.votingPower.toString());
  if (voteRecord) {
    store.remove('VoteRecorded', id);
  } else {
    voteRecord = new VoteRecorded(id);
    voteRecord.voter = event.params.voter.toHexString();
    voteRecord.chainId = event.params.chainId;
    voteRecord.epochId = event.params.epochId;
    voteRecord.votePower = votePower;
    voteRecord.blockNumber = event.block.number;
    voteRecord.contract = event.address.toHexString();
    voteRecord.save();
  }

  // If voted for address 0x00... minus one voting count
  let user = User.load(event.params.voter.toHexString());
  if (user) {
    user.votingCount = user.votingCount.plus(ONE_BI);
  } else {
    user = new User(event.params.voter.toHexString());
    user.nominationCount = ZERO_BI;
    user.votingCount = ONE_BI;
  }
  user.save();

  let resultId = event.params.voter
    .toHexString()
    .concat('-')
    .concat(event.params.chainId.toString())
    .concat('-')
    .concat(event.address.toHexString())
    .concat('-')
    .concat(event.params.epochId.toString());
  let result = VoteResult.load(resultId);

  if (result == null) {
    result = new VoteResult(resultId);
    result.epochId = event.params.epochId.toString();
    result.votePower = votePower;
    result.voteCount = ONE_BI;
    result.contract = event.address.toHexString();
  } else {
    result.votePower = result.votePower.plus(votePower);
    result.voteCount = result.voteCount.plus(ONE_BI);
  }
  result.save();
}

// Do we need those?

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
