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
  VoteRecorded as VoteRecordedEvent
} from "../generated/ElectionModule/ElectionModule"
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
  VoteRecorded
} from "../generated/schema"

export function handleCandidateNominated(event: CandidateNominatedEvent): void {
  let entity = new CandidateNominated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.candidate = event.params.candidate
  entity.epochId = event.params.epochId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCouncilMemberAdded(event: CouncilMemberAddedEvent): void {
  let entity = new CouncilMemberAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.member = event.params.member
  entity.epochIndex = event.params.epochIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCouncilMemberRemoved(
  event: CouncilMemberRemovedEvent
): void {
  let entity = new CouncilMemberRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.member = event.params.member
  entity.epochIndex = event.params.epochIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCouncilMembersDismissed(
  event: CouncilMembersDismissedEvent
): void {
  let entity = new CouncilMembersDismissed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.dismissedMembers = event.params.dismissedMembers
  entity.epochId = event.params.epochId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleElectionBatchEvaluated(
  event: ElectionBatchEvaluatedEvent
): void {
  let entity = new ElectionBatchEvaluated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.epochId = event.params.epochId
  entity.numEvaluatedBallots = event.params.numEvaluatedBallots
  entity.totalBallots = event.params.totalBallots

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleElectionEvaluated(event: ElectionEvaluatedEvent): void {
  let entity = new ElectionEvaluated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.epochId = event.params.epochId
  entity.ballotCount = event.params.ballotCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleElectionModuleInitialized(
  event: ElectionModuleInitializedEvent
): void {
  let entity = new ElectionModuleInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEmergencyElectionStarted(
  event: EmergencyElectionStartedEvent
): void {
  let entity = new EmergencyElectionStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.epochId = event.params.epochId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEpochScheduleUpdated(
  event: EpochScheduleUpdatedEvent
): void {
  let entity = new EpochScheduleUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.epochId = event.params.epochId
  entity.startDate = event.params.startDate
  entity.endDate = event.params.endDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEpochStarted(event: EpochStartedEvent): void {
  let entity = new EpochStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.epochId = event.params.epochId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNominationWithdrawn(
  event: NominationWithdrawnEvent
): void {
  let entity = new NominationWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.candidate = event.params.candidate
  entity.epochId = event.params.epochId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteRecorded(event: VoteRecordedEvent): void {
  let entity = new VoteRecorded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.chainId = event.params.chainId
  entity.epochId = event.params.epochId
  entity.votingPower = event.params.votingPower

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
