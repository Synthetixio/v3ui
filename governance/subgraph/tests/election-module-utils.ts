import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
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
} from '../generated/ElectionModule/ElectionModule';

import {
  VoteRecorded as VoteRecordedOldEvent,
  VoteWithdrawn as VoteWithdrawnOldEvent,
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

export function createCouncilMemberRemovedEvent(
  member: Address,
  epochIndex: BigInt
): CouncilMemberRemoved {
  let councilMemberRemovedEvent = changetype<CouncilMemberRemoved>(newMockEvent());

  councilMemberRemovedEvent.parameters = new Array();

  councilMemberRemovedEvent.parameters.push(
    new ethereum.EventParam('member', ethereum.Value.fromAddress(member))
  );
  councilMemberRemovedEvent.parameters.push(
    new ethereum.EventParam('epochIndex', ethereum.Value.fromUnsignedBigInt(epochIndex))
  );

  return councilMemberRemovedEvent;
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

export function createElectionBatchEvaluatedEvent(
  epochId: BigInt,
  numEvaluatedBallots: BigInt,
  totalBallots: BigInt
): ElectionBatchEvaluated {
  let electionBatchEvaluatedEvent = changetype<ElectionBatchEvaluated>(newMockEvent());

  electionBatchEvaluatedEvent.parameters = new Array();

  electionBatchEvaluatedEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );
  electionBatchEvaluatedEvent.parameters.push(
    new ethereum.EventParam(
      'numEvaluatedBallots',
      ethereum.Value.fromUnsignedBigInt(numEvaluatedBallots)
    )
  );
  electionBatchEvaluatedEvent.parameters.push(
    new ethereum.EventParam('totalBallots', ethereum.Value.fromUnsignedBigInt(totalBallots))
  );

  return electionBatchEvaluatedEvent;
}

export function createElectionEvaluatedEvent(
  epochId: BigInt,
  ballotCount: BigInt
): ElectionEvaluated {
  let electionEvaluatedEvent = changetype<ElectionEvaluated>(newMockEvent());

  electionEvaluatedEvent.parameters = new Array();

  electionEvaluatedEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );
  electionEvaluatedEvent.parameters.push(
    new ethereum.EventParam('ballotCount', ethereum.Value.fromUnsignedBigInt(ballotCount))
  );

  return electionEvaluatedEvent;
}

export function createElectionModuleInitializedEvent(): ElectionModuleInitialized {
  let electionModuleInitializedEvent = changetype<ElectionModuleInitialized>(newMockEvent());

  electionModuleInitializedEvent.parameters = new Array();

  return electionModuleInitializedEvent;
}

export function createEmergencyElectionStartedEvent(epochId: BigInt): EmergencyElectionStarted {
  let emergencyElectionStartedEvent = changetype<EmergencyElectionStarted>(newMockEvent());

  emergencyElectionStartedEvent.parameters = new Array();

  emergencyElectionStartedEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );

  return emergencyElectionStartedEvent;
}

export function createEpochScheduleUpdatedEvent(
  epochId: BigInt,
  startDate: BigInt,
  endDate: BigInt
): EpochScheduleUpdated {
  let epochScheduleUpdatedEvent = changetype<EpochScheduleUpdated>(newMockEvent());

  epochScheduleUpdatedEvent.parameters = new Array();

  epochScheduleUpdatedEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );
  epochScheduleUpdatedEvent.parameters.push(
    new ethereum.EventParam('startDate', ethereum.Value.fromUnsignedBigInt(startDate))
  );
  epochScheduleUpdatedEvent.parameters.push(
    new ethereum.EventParam('endDate', ethereum.Value.fromUnsignedBigInt(endDate))
  );

  return epochScheduleUpdatedEvent;
}

export function createEpochStartedEvent(epochId: BigInt): EpochStarted {
  let epochStartedEvent = changetype<EpochStarted>(newMockEvent());

  epochStartedEvent.parameters = new Array();

  epochStartedEvent.parameters.push(
    new ethereum.EventParam('epochId', ethereum.Value.fromUnsignedBigInt(epochId))
  );

  return epochStartedEvent;
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
  votingPower: BigInt
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
