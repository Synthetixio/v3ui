import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CandidateNominated } from "../generated/schema"
import { CandidateNominated as CandidateNominatedEvent } from "../generated/ElectionModule/ElectionModule"
import { handleCandidateNominated } from "../src/election-module"
import { createCandidateNominatedEvent } from "./election-module-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let candidate = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let epochId = BigInt.fromI32(234)
    let newCandidateNominatedEvent = createCandidateNominatedEvent(
      candidate,
      epochId
    )
    handleCandidateNominated(newCandidateNominatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CandidateNominated created and stored", () => {
    assert.entityCount("CandidateNominated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CandidateNominated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "candidate",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CandidateNominated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "epochId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
