import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  CandidateNominated,
  CouncilMemberAdded,
  CouncilMembersDismissed,
  NominationWithdrawn,
  VoteRecorded,
} from '../generated/ElectionModule/ElectionModule';

import {
  VoteRecorded as VoteRecordedOldEvent,
  VoteWithdrawn as VoteWithdrawnOldEvent,
  CandidateNominated as CandidateNominatedOldEvent,
  NominationWithdrawn as NominationWithdrawnOldEvent,
  CouncilMemberAdded as CouncilMemberAddedOldEvent,
  CouncilMembersDismissed as CouncilMembersDismissedOldEvent,
} from '../generated/Spartan/ElectionModuleOld';

export function createCandidateNominatedEvent(
  candidate: Address,
  epochId: BigInt
): CandidateNominated {
  let candidateNominatedEvent = changetype<CandidateNominated>(newMockEvent());

  candidateNominatedEvent.parameters = new Array();

  candidateNominatedEvent.parameters.push(
    new ethereum.EventParam('candidate', ethereum.Value.fromAddress(candidate))
  );
  candidateNominatedEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );

  return candidateNominatedEvent;
}

export function createCouncilMemberAddedEvent(
  member: Address,
  epochIndex: BigInt
): CouncilMemberAdded {
  let councilMemberAddedEvent = changetype<CouncilMemberAdded>(newMockEvent());

  councilMemberAddedEvent.parameters = new Array();

  councilMemberAddedEvent.parameters.push(
    new ethereum.EventParam('member', ethereum.Value.fromAddress(member))
  );
  councilMemberAddedEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );

  return councilMemberAddedEvent;
}

export function createCouncilMembersDismissedEvent(
  dismissedMembers: Array<Address>,
  epochId: BigInt
): CouncilMembersDismissed {
  let councilMembersDismissedEvent = changetype<CouncilMembersDismissed>(newMockEvent());

  councilMembersDismissedEvent.parameters = new Array();

  councilMembersDismissedEvent.parameters.push(
    new ethereum.EventParam('dismissedMembers', ethereum.Value.fromAddressArray(dismissedMembers))
  );
  councilMembersDismissedEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );

  return councilMembersDismissedEvent;
}

export function createNominationWithdrawnEvent(
  candidate: Address,
  epochId: BigInt
): NominationWithdrawn {
  let nominationWithdrawnEvent = changetype<NominationWithdrawn>(newMockEvent());

  nominationWithdrawnEvent.parameters = new Array();

  nominationWithdrawnEvent.parameters.push(
    new ethereum.EventParam('candidate', ethereum.Value.fromAddress(candidate))
  );
  nominationWithdrawnEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );

  return nominationWithdrawnEvent;
}

export function createVoteRecordedEvent(
  voter: Address,
  chainId: BigInt,
  epochId: BigInt,
  votingPower: BigInt,
  candidates: Address[]
): VoteRecorded {
  let voteRecordedEvent = changetype<VoteRecorded>(newMockEvent());

  voteRecordedEvent.parameters = new Array();

  voteRecordedEvent.parameters.push(
    new ethereum.EventParam('voter', ethereum.Value.fromAddress(voter))
  );
  voteRecordedEvent.parameters.push(
    new ethereum.EventParam('chainId', ethereum.Value.fromUnsignedBigInt(chainId))
  );
  voteRecordedEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );
  voteRecordedEvent.parameters.push(
    new ethereum.EventParam('votingPower', ethereum.Value.fromUnsignedBigInt(votingPower))
  );

  voteRecordedEvent.parameters.push(
    new ethereum.EventParam('candidates', ethereum.Value.fromAddressArray(candidates))
  );

  voteRecordedEvent.address = Address.fromString('0x47872B16557875850a02C94B28d959515F894913');

  return voteRecordedEvent;
}

export function createVoteRecordedOldEvent(
  voter: Address,
  ballotId: Bytes,
  epochIndex: BigInt,
  votePower: BigInt
): VoteRecordedOldEvent {
  let voteRecordedOldEvent = changetype<VoteRecordedOldEvent>(newMockEvent());

  voteRecordedOldEvent.parameters = new Array();

  voteRecordedOldEvent.parameters.push(
    new ethereum.EventParam('voter', ethereum.Value.fromAddress(voter))
  );
  voteRecordedOldEvent.parameters.push(
    new ethereum.EventParam('ballotId', ethereum.Value.fromBytes(ballotId))
  );
  voteRecordedOldEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );
  voteRecordedOldEvent.parameters.push(
    new ethereum.EventParam('votePower', ethereum.Value.fromUnsignedBigInt(votePower))
  );

  return voteRecordedOldEvent;
}

export function createVoteWithdrawnOldEvent(
  voter: Address,
  ballotId: Bytes,
  epochIndex: BigInt,
  votePower: BigInt
): VoteWithdrawnOldEvent {
  let voteWithdrawnOldEvent = changetype<VoteWithdrawnOldEvent>(newMockEvent());

  voteWithdrawnOldEvent.parameters = new Array();

  voteWithdrawnOldEvent.parameters.push(
    new ethereum.EventParam('voter', ethereum.Value.fromAddress(voter))
  );
  voteWithdrawnOldEvent.parameters.push(
    new ethereum.EventParam('ballotId', ethereum.Value.fromBytes(ballotId))
  );
  voteWithdrawnOldEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );
  voteWithdrawnOldEvent.parameters.push(
    new ethereum.EventParam('votePower', ethereum.Value.fromUnsignedBigInt(votePower))
  );

  return voteWithdrawnOldEvent;
}

export function createCandidateNominatedOldEvent(
  voter: Address,
  epochIndex: BigInt
): CandidateNominatedOldEvent {
  let candidateNominatedOldEvent = changetype<CandidateNominatedOldEvent>(newMockEvent());

  candidateNominatedOldEvent.parameters = new Array();

  candidateNominatedOldEvent.parameters.push(
    new ethereum.EventParam('voter', ethereum.Value.fromAddress(voter))
  );
  candidateNominatedOldEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );

  candidateNominatedOldEvent.address = Address.fromString(
    '0xE832C302D1160EAe57045eb9d9Ea14daBd2E229c'
  );

  return candidateNominatedOldEvent;
}

export function createNominationWithdrawOldEvent(
  voter: Address,
  epochIndex: BigInt
): NominationWithdrawnOldEvent {
  let nominationWithdrawnOldEvent = changetype<NominationWithdrawnOldEvent>(newMockEvent());

  nominationWithdrawnOldEvent.parameters = new Array();

  nominationWithdrawnOldEvent.parameters.push(
    new ethereum.EventParam('voter', ethereum.Value.fromAddress(voter))
  );
  nominationWithdrawnOldEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );

  return nominationWithdrawnOldEvent;
}

export function createCouncilMemberAddedEventOld(
  member: Address,
  epochIndex: BigInt
): CouncilMemberAddedOldEvent {
  let councilMemberAddedOldEvent = changetype<CouncilMemberAddedOldEvent>(newMockEvent());

  councilMemberAddedOldEvent.parameters = new Array();

  councilMemberAddedOldEvent.parameters.push(
    new ethereum.EventParam('member', ethereum.Value.fromAddress(member))
  );

  councilMemberAddedOldEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );

  return councilMemberAddedOldEvent;
}

export function createCouncilMembersDismissedEventOld(
  dismissedMembers: Address[],
  epochIndex: BigInt
): CouncilMembersDismissedOldEvent {
  let councilMembersDismissedOldEvent = changetype<CouncilMembersDismissedOldEvent>(newMockEvent());

  councilMembersDismissedOldEvent.parameters = new Array();

  councilMembersDismissedOldEvent.parameters.push(
    new ethereum.EventParam('members', ethereum.Value.fromAddressArray(dismissedMembers))
  );

  councilMembersDismissedOldEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );

  return councilMembersDismissedOldEvent;
}
