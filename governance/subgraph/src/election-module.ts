import {
  CandidateNominated as CandidateNominatedEvent,
  CouncilMemberAdded as CouncilMemberAddedEvent,
  CouncilMembersDismissed as CouncilMembersDismissedEvent,
  NominationWithdrawn as NominationWithdrawnEvent,
  VoteRecorded as VoteRecordedEvent,
} from '../generated/ElectionModule/ElectionModule';
import {
  VoteRecorded as VoteRecordedOldEvent,
  VoteWithdrawn as VoteWithdrawnOldEvent,
  NominationWithdrawn as NominationWithdrawnOldEvent,
  CandidateNominated as CandidateNominatedOldEvent,
  CouncilMemberAdded as CouncilMemberAddedOldEvent,
  CouncilMembersDismissed as CouncilMembersDismissedOldEvent,
} from '../generated/Spartan/ElectionModuleOld';
import { VoteRecorded, User, VoteResult } from '../generated/schema';
import { store, BigInt, log, BigDecimal } from '@graphprotocol/graph-ts';

// Old Subgraph handlers

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);

export function handleCouncilMemberAddedOld(event: CouncilMemberAddedOldEvent): void {
  let user = User.load(event.params.member.toHexString());
  if (user) {
    const temp = user.memberIn;
    temp!.push(event.address.toHexString());
    user.memberIn = temp;
  } else {
    user = new User(event.params.member.toHexString());
    user.nominationCount = ONE_BI;
    user.votingCount = ZERO_BI;
    user.memberIn = [];
    user.kickedOut = [];
  }
  user.save();
}

export function handleCouncilMembersDismissedOld(event: CouncilMembersDismissedOldEvent): void {
  for (let index = 0; index < event.params.members.length; index++) {
    let user = User.load(event.params.members[index].toHexString());
    if (user) {
      const temp = user.kickedOut;
      temp!.push(event.address.toHexString());
      user.kickedOut = temp;
    } else {
      user = new User(event.params.members[index].toHexString());
      user.nominationCount = ONE_BI;
      user.votingCount = ZERO_BI;
      user.memberIn = [];
      user.kickedOut = [];
    }
    user.save();
  }
}

export function handleCandidateNominatedOld(event: CandidateNominatedOldEvent): void {
  let user = User.load(event.params.candidate.toHexString());
  if (user) {
    user.nominationCount = user.nominationCount.plus(ONE_BI);
  } else {
    user = new User(event.params.candidate.toHexString());
    user.nominationCount = ONE_BI;
    user.votingCount = ZERO_BI;
    user.memberIn = [];
    user.kickedOut = [];
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
      .concat(event.params.epochIndex.toString())
      .concat('-')
      .concat('10')
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
    user.memberIn = [];
    user.kickedOut = [];
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
  result.voter = event.params.voter.toHexString();
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
      .concat(event.params.epochIndex.toString())
      .concat('-')
      .concat('10')
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
    user.memberIn = [];
    user.kickedOut = [];
  }
  user.save();
}

export function handleCouncilMemberAdded(event: CouncilMemberAddedEvent): void {
  let user = User.load(event.params.member.toHexString());
  if (user) {
    const temp = user.memberIn;
    temp!.push(event.address.toHexString());
    user.memberIn = temp;
  } else {
    user = new User(event.params.member.toHexString());
    user.nominationCount = ONE_BI;
    user.votingCount = ZERO_BI;
    user.memberIn = [];
    user.kickedOut = [];
  }
  user.save();
}

export function handleCouncilMembersDismissed(event: CouncilMembersDismissedEvent): void {
  for (let index = 0; index < event.params.dismissedMembers.length; index++) {
    let user = User.load(event.params.dismissedMembers[index].toHexString());
    if (user) {
      const temp = user.kickedOut;
      temp!.push(event.address.toHexString());
      user.kickedOut = temp;
    } else {
      user = new User(event.params.dismissedMembers[index].toHexString());
      user.nominationCount = ONE_BI;
      user.votingCount = ZERO_BI;
      user.memberIn = [];
      user.kickedOut = [];
    }
    user.save();
  }
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
    .concat(event.params.epochId.toString())
    .concat('-')
    .concat(event.params.chainId.toString());
  let voteRecord = VoteRecorded.load(id);

  let votePower = BigDecimal.fromString(event.params.votingPower.toString());
  if (
    voteRecord &&
    event.params.candidates[0].toHexString().includes('0x0000000000000000000000000000000000000000')
  ) {
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
    if (
      event.params.candidates[0]
        .toHexString()
        .includes('0x0000000000000000000000000000000000000000')
    ) {
      user.votingCount = user.votingCount.minus(ONE_BI);
    } else {
      user.votingCount = user.votingCount.plus(ONE_BI);
    }
  } else {
    user = new User(event.params.voter.toHexString());
    user.nominationCount = ZERO_BI;
    user.votingCount = ONE_BI;
    user.memberIn = [];
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
  result.candidate = event.params.candidates.at(0).toHexString();
  result.voter = event.params.voter.toHexString();
  result.save();
}
