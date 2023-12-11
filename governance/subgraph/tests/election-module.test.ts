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
  createVoteRecordedOldEvent,
} from './election-module-utils';
import { handleCandidateNominatedOld, handleVoteRecordedOld } from '../src/election-module';

const candidate = Address.fromString('0x0000000000000000000000000000000000000001');
const epochId = BigInt.fromI32(234);

describe('Election Module Old', () => {
  beforeAll(() => {
    const nominationOldEvent = createCandidateNominatedOldEvent(candidate, epochId);
    handleCandidateNominatedOld(nominationOldEvent);
  });

  afterAll(() => {
    clearStore();
  });

  test('user nominated himself', () => {
    assert.entityCount('User', 1);
    assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '1');
    assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
  });

  test('user votes for non existing candidate', () => {
    const voteRecordedOldEvent = createVoteRecordedOldEvent(
      candidate,
      Bytes.fromI32(1),
      epochId,
      BigInt.fromI32(100)
    );
    handleVoteRecordedOld(voteRecordedOldEvent);
    assert.entityCount('VoteOld', 1);
    assert.entityCount('VoteResultOld', 1);
  });
});
