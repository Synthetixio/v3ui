import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from 'matchstick-as/assembly/index';
import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  createCandidateNominatedEvent,
  createCandidateNominatedOldEvent,
  createNominationWithdrawOldEvent,
  createVoteRecordedOldEvent,
} from './election-module-utils';
import {
  handleCandidateNominatedOld,
  handleNominationWithdrawnOld,
  handleVoteRecordedOld,
} from '../src/election-module';

const candidate = Address.fromString('0x0000000000000000000000000000000000000001');
const epochId = BigInt.fromI32(234);

describe('Election Module', () => {
  beforeAll(() => {
    const nominationOldEvent = createCandidateNominatedOldEvent(candidate, epochId);
    handleCandidateNominatedOld(nominationOldEvent);
  });

  afterAll(() => {
    clearStore();
  });

  describe('Nomination Old Events', () => {
    test('user nominated himself', () => {
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', candidate.toHexString(), 'nominationWithdrewCount', '0');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
      assert.fieldEquals('User', candidate.toHexString(), 'votingWithdrewCount', '0');
    });

    test('user withdrew his nomination', () => {
      const nominationWithdrawnOldEvent = createNominationWithdrawOldEvent(candidate, epochId);
      handleNominationWithdrawnOld(nominationWithdrawnOldEvent);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', candidate.toHexString(), 'nominationWithdrewCount', '1');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
      assert.fieldEquals('User', candidate.toHexString(), 'votingWithdrewCount', '0');
    });
  });

  describe('Nomination Events', () => {
    beforeAll(() => {
      const nominationOldEvent = createCandidateNominatedOldEvent(candidate, epochId);
      handleCandidateNominatedOld(nominationOldEvent);
    });

    test('user nominated himself', () => {
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', candidate.toHexString(), 'nominationWithdrewCount', '1');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
      assert.fieldEquals('User', candidate.toHexString(), 'votingWithdrewCount', '0');
    });
  });
  // test('user votes for non existing candidate', () => {
  //   const voteRecordedOldEvent = createVoteRecordedOldEvent(
  //     candidate,
  //     Bytes.fromI32(1),
  //     epochId,
  //     BigInt.fromI32(100)
  //   );
  //   handleVoteRecordedOld(voteRecordedOldEvent);
  //   assert.entityCount('VoteOld', 1);
  //   assert.entityCount('VoteResultOld', 1);
  // });
});
