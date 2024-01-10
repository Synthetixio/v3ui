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
  epochId: bigint
): CandidateNominated {
  const candidateNominatedEvent = changetype<CandidateNominated>(newMockEvent());

  candidateNominatedEvent.parameters = [];

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
  epochIndex: bigint
): CouncilMemberAdded {
  const councilMemberAddedEvent = changetype<CouncilMemberAdded>(newMockEvent());

  councilMemberAddedEvent.parameters = [];

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
  epochId: bigint
): CouncilMembersDismissed {
  const councilMembersDismissedEvent = changetype<CouncilMembersDismissed>(newMockEvent());

  councilMembersDismissedEvent.parameters = [];

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
  epochId: bigint
): NominationWithdrawn {
  const nominationWithdrawnEvent = changetype<NominationWithdrawn>(newMockEvent());

  nominationWithdrawnEvent.parameters = [];

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
  chainId: bigint,
  epochId: bigint,
  votingPower: bigint,
  candidates: Address[]
): VoteRecorded {
  const voteRecordedEvent = changetype<VoteRecorded>(newMockEvent());

  voteRecordedEvent.parameters = [];

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
  epochIndex: bigint,
  votePower: bigint
): VoteRecordedOldEvent {
  const voteRecordedOldEvent = changetype<VoteRecordedOldEvent>(newMockEvent());

  voteRecordedOldEvent.parameters = [];

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
  epochIndex: bigint,
  votePower: bigint
): VoteWithdrawnOldEvent {
  const voteWithdrawnOldEvent = changetype<VoteWithdrawnOldEvent>(newMockEvent());

  voteWithdrawnOldEvent.parameters = [];

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
  epochIndex: bigint
): CandidateNominatedOldEvent {
  const candidateNominatedOldEvent = changetype<CandidateNominatedOldEvent>(newMockEvent());

  candidateNominatedOldEvent.parameters = [];

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
  epochIndex: bigint
): NominationWithdrawnOldEvent {
  const nominationWithdrawnOldEvent = changetype<NominationWithdrawnOldEvent>(newMockEvent());

  nominationWithdrawnOldEvent.parameters = [];

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
  epochIndex: bigint
): CouncilMemberAddedOldEvent {
  const councilMemberAddedOldEvent = changetype<CouncilMemberAddedOldEvent>(newMockEvent());

  councilMemberAddedOldEvent.parameters = [];

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
  epochIndex: bigint
): CouncilMembersDismissedOldEvent {
  const councilMembersDismissedOldEvent =
    changetype<CouncilMembersDismissedOldEvent>(newMockEvent());

  councilMembersDismissedOldEvent.parameters = [];

  councilMembersDismissedOldEvent.parameters.push(
    new ethereum.EventParam('members', ethereum.Value.fromAddressArray(dismissedMembers))
  );

  councilMembersDismissedOldEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );

  return councilMembersDismissedOldEvent;
}
