import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  logStore,
} from 'matchstick-as/assembly/index';
import { Address, BigInt, Bytes, log, store } from '@graphprotocol/graph-ts';
import {
  createCandidateNominatedEvent,
  createCandidateNominatedOldEvent,
  createNominationWithdrawOldEvent,
  createNominationWithdrawnEvent,
  createVoteRecordedEvent,
  createVoteRecordedOldEvent,
  createVoteWithdrawnOldEvent,
} from './election-module-utils';
import {
  handleCandidateNominated,
  handleCandidateNominatedOld,
  handleNominationWithdrawn,
  handleNominationWithdrawnOld,
  handleVoteRecorded,
  handleVoteRecordedOld,
  handleVoteWithdrawnOld,
} from '../src/election-module';

const candidate = Address.fromString('0x0000000000000000000000000000000000000001');
const epochId = BigInt.fromI32(234);

describe('Election Module', () => {
  afterAll(() => {
    clearStore();
  });

  describe('Nomination Old Events', () => {
    beforeAll(() => {
      const nominationOldEvent = createCandidateNominatedOldEvent(candidate, epochId);
      handleCandidateNominatedOld(nominationOldEvent);
    });
    test('user nominated himself', () => {
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
    });

    test('user withdrew his nomination', () => {
      const nominationWithdrawnOldEvent = createNominationWithdrawOldEvent(candidate, epochId);
      handleNominationWithdrawnOld(nominationWithdrawnOldEvent);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '0');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
    });
  });

  describe('Nomination Events', () => {
    beforeAll(() => {
      const nominationEvent = createCandidateNominatedEvent(candidate, epochId);
      handleCandidateNominated(nominationEvent);
    });

    test('user nominated himself', () => {
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
    });

    test('user withdrew his nomination', () => {
      const nominationWithdrawnEvent = createNominationWithdrawnEvent(candidate, epochId);
      handleNominationWithdrawn(nominationWithdrawnEvent);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '0');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
    });
  });

  describe('Voting Old Events', () => {
    beforeAll(() => {
      const nominationOldEvent = createCandidateNominatedOldEvent(candidate, epochId);
      handleCandidateNominatedOld(nominationOldEvent);
    });

    test('user votes for himself', () => {
      const voteRecordedOldEvent = createVoteRecordedOldEvent(
        candidate,
        Bytes.fromI32(1),
        epochId,
        BigInt.fromI32(100)
      );
      handleVoteRecordedOld(voteRecordedOldEvent);

      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '1');

      // Vote Result
      assert.entityCount('VoteRecorded', 1);
      const id = candidate
        .toHexString()
        .concat('-')
        .concat(voteRecordedOldEvent.address.toHexString())
        .concat('-')
        .concat(epochId.toString());

      assert.fieldEquals('VoteRecorded', id, 'voter', candidate.toHexString());
      assert.fieldEquals('VoteRecorded', id, 'chainId', '10');
      assert.fieldEquals('VoteRecorded', id, 'epochId', epochId.toString());
      assert.fieldEquals('VoteRecorded', id, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', id, 'blockNumber', '1');
      assert.fieldEquals(
        'VoteRecorded',
        id,
        'contract',
        voteRecordedOldEvent.address.toHexString()
      );

      // Vote Recorded
      assert.entityCount('VoteResult', 1);
      const voteResultId = candidate
        .toHexString()
        .concat('-')
        .concat('10')
        .concat('-')
        .concat(voteRecordedOldEvent.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.fieldEquals('VoteResult', voteResultId, 'votePower', '100');
      assert.fieldEquals('VoteResult', voteResultId, 'voteCount', '1');
      assert.fieldEquals('VoteResult', voteResultId, 'epochId', epochId.toString());
      assert.fieldEquals(
        'VoteResult',
        voteResultId,
        'contract',
        voteRecordedOldEvent.address.toHexString()
      );
    });

    test('user withdraws his vote', () => {
      const voteWithdrawnOldEvent = createVoteWithdrawnOldEvent(
        candidate,
        Bytes.fromI32(1),
        epochId,
        BigInt.fromI32(100)
      );
      handleVoteWithdrawnOld(voteWithdrawnOldEvent);
      assert.entityCount('VoteRecorded', 0);
      assert.entityCount('VoteResult', 0);

      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '0');
    });
  });

  describe('Voting Event', () => {
    beforeAll(() => {
      const nominationOldEvent = createCandidateNominatedOldEvent(candidate, epochId);
      handleCandidateNominatedOld(nominationOldEvent);
      const voteRecordedOldEvent = createVoteRecordedOldEvent(
        candidate,
        Bytes.fromI32(1),
        epochId,
        BigInt.fromI32(100)
      );
      handleVoteRecordedOld(voteRecordedOldEvent);
      const voteRecorded = createVoteRecordedEvent(
        candidate,
        BigInt.fromI32(10),
        epochId,
        BigInt.fromI32(100)
      );
      handleVoteRecorded(voteRecorded);
    });
    test('user votes for himself (mothership)', () => {
      const voteRecorded = createVoteRecordedEvent(
        candidate,
        BigInt.fromI32(10),
        epochId,
        BigInt.fromI32(100)
      );

      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '2');

      // Vote Recorded
      assert.entityCount('VoteRecorded', 2);
      const id = candidate
        .toHexString()
        .concat('-')
        .concat(voteRecorded.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.fieldEquals('VoteRecorded', id, 'voter', candidate.toHexString());
      assert.fieldEquals('VoteRecorded', id, 'chainId', '10');
      assert.fieldEquals('VoteRecorded', id, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', id, 'blockNumber', '1');
      assert.fieldEquals('VoteRecorded', id, 'contract', voteRecorded.address.toHexString());
      assert.entityCount('VoteResult', 2);

      // Vote Result
      assert.entityCount('VoteResult', 2);
    });
    test('user votes for himself (multi chain)', () => {
      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', candidate.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', candidate.toHexString(), 'votingCount', '2');
    });
  });
});
