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
  createCouncilMemberAddedEvent,
  createCouncilMemberAddedEventOld,
  createCouncilMembersDismissedEvent,
  createCouncilMembersDismissedEventOld,
  createNominationWithdrawOldEvent,
  createNominationWithdrawnEvent,
  createVoteRecordedEvent,
  createVoteRecordedOldEvent,
  createVoteWithdrawnOldEvent,
} from './election-module-utils';
import {
  handleCandidateNominated,
  handleCandidateNominatedOld,
  handleCouncilMemberAdded,
  handleCouncilMemberAddedOld,
  handleCouncilMembersDismissed,
  handleCouncilMembersDismissedOld,
  handleNominationWithdrawn,
  handleNominationWithdrawnOld,
  handleVoteRecorded,
  handleVoteRecordedOld,
  handleVoteWithdrawnOld,
} from '../src/election-module';

const voter = Address.fromString('0x0000000000000000000000000000000000000001');
const epochId = BigInt.fromI32(234);
const epochId2 = BigInt.fromI32(235);
const candidates = [Address.fromString('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')];

// TODO test member added and dismissed event for old and new contracts and work with epochID2

describe('Election Module', () => {
  afterAll(() => {
    clearStore();
  });

  describe('Nomination Old Events', () => {
    beforeAll(() => {
      const nominationOldEvent = createCandidateNominatedOldEvent(voter, epochId);
      handleCandidateNominatedOld(nominationOldEvent);
    });
    test('user nominated himself', () => {
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '0');
    });

    test('user withdrew his nomination', () => {
      const nominationWithdrawnOldEvent = createNominationWithdrawOldEvent(voter, epochId);
      handleNominationWithdrawnOld(nominationWithdrawnOldEvent);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '0');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '0');
    });
  });

  describe('Nomination Events', () => {
    beforeAll(() => {
      const nominationEvent = createCandidateNominatedEvent(voter, epochId);
      handleCandidateNominated(nominationEvent);
    });

    test('user nominated himself', () => {
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '0');
    });

    test('user withdrew his nomination', () => {
      const nominationWithdrawnEvent = createNominationWithdrawnEvent(voter, epochId);
      handleNominationWithdrawn(nominationWithdrawnEvent);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '0');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '0');
    });
  });

  describe('Voting Old Events', () => {
    beforeAll(() => {
      const nominationOldEvent = createCandidateNominatedOldEvent(voter, epochId);
      handleCandidateNominatedOld(nominationOldEvent);
    });

    test('user votes for himself', () => {
      const voteRecordedOldEvent = createVoteRecordedOldEvent(
        voter,
        Bytes.fromI32(1),
        epochId,
        BigInt.fromI32(100)
      );
      handleVoteRecordedOld(voteRecordedOldEvent);

      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '1');

      // Vote Result
      assert.entityCount('VoteRecorded', 1);
      const id = voter
        .toHexString()
        .concat('-')
        .concat(voteRecordedOldEvent.address.toHexString())
        .concat('-')
        .concat(epochId.toString())
        .concat('-')
        .concat('10');

      assert.fieldEquals('VoteRecorded', id, 'voter', voter.toHexString());
      assert.fieldEquals('VoteRecorded', id, 'chainId', '10');
      assert.fieldEquals('VoteRecorded', id, 'epochId', epochId.toString());
      assert.fieldEquals('VoteRecorded', id, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', id, 'blockNumber', '1');
      assert.fieldEquals('VoteRecorded', id, 'voter', voter.toHexString());
      assert.fieldEquals(
        'VoteRecorded',
        id,
        'contract',
        voteRecordedOldEvent.address.toHexString()
      );

      // Vote Recorded
      assert.entityCount('VoteResult', 1);
      const voteResultId = voter
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
        voter,
        Bytes.fromI32(1),
        epochId,
        BigInt.fromI32(100)
      );
      handleVoteWithdrawnOld(voteWithdrawnOldEvent);
      assert.entityCount('VoteRecorded', 0);
      assert.entityCount('VoteResult', 0);

      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '0');
    });
  });

  describe('Council Member Added Event Old', () => {
    test('user gets added to council', () => {
      const event = createCouncilMemberAddedEventOld(voter, epochId);
      handleCouncilMemberAddedOld(event);
      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '0');
      assert.fieldEquals(
        'User',
        voter.toHexString(),
        'memberIn',
        `[${event.address.toHexString()}]`
      );
    });
  });

  describe('Council Member Added Event', () => {
    test('user gets added to council', () => {
      const eventOld = createCouncilMemberAddedEventOld(voter, epochId);
      const event = createCouncilMemberAddedEvent(voter, epochId);
      handleCouncilMemberAdded(event);
      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '0');
      assert.fieldEquals(
        'User',
        voter.toHexString(),
        'memberIn',
        `[${eventOld.address.toHexString()}, ${event.address.toHexString()}]`
      );
    });
  });

  describe('Council Member Dismissed Event Old', () => {
    test('user gets dismissed from council', () => {
      const event = createCouncilMembersDismissedEventOld([voter], epochId);
      handleCouncilMembersDismissedOld(event);
      // User
      assert.entityCount('User', 1);
      assert.fieldEquals(
        'User',
        voter.toHexString(),
        'kickedOut',
        `[${event.address.toHexString()}]`
      );
    });
  });

  describe('Council Member Dismissed Event', () => {
    test('user gets dismissed from council', () => {
      const eventOld = createCouncilMembersDismissedEventOld([voter], epochId);
      const event = createCouncilMembersDismissedEvent([voter], epochId);
      handleCouncilMembersDismissed(event);
      // User
      assert.entityCount('User', 1);
      assert.fieldEquals(
        'User',
        voter.toHexString(),
        'kickedOut',
        `[${eventOld.address.toHexString()}, ${event.address.toHexString()}]`
      );
    });
  });

  describe('Voting Event', () => {
    beforeAll(() => {
      const nominationOldEvent = createCandidateNominatedOldEvent(voter, epochId);
      handleCandidateNominatedOld(nominationOldEvent);
      const voteRecordedOldEvent = createVoteRecordedOldEvent(
        voter,
        Bytes.fromI32(1),
        epochId,
        BigInt.fromI32(100)
      );
      handleVoteRecordedOld(voteRecordedOldEvent);
      const voteRecorded = createVoteRecordedEvent(
        voter,
        BigInt.fromI32(10),
        epochId,
        BigInt.fromI32(100),
        candidates
      );
      handleVoteRecorded(voteRecorded);
    });
    test('user votes for himself (mothership)', () => {
      const voteRecorded = createVoteRecordedEvent(
        voter,
        BigInt.fromI32(10),
        epochId,
        BigInt.fromI32(100),
        candidates
      );

      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '2');

      // Vote Recorded
      assert.entityCount('VoteRecorded', 2);
      const id = voter
        .toHexString()
        .concat('-')
        .concat(voteRecorded.address.toHexString())
        .concat('-')
        .concat(epochId.toString())
        .concat('-')
        .concat(voteRecorded.params.chainId.toString());
      assert.fieldEquals('VoteRecorded', id, 'voter', voter.toHexString());
      assert.fieldEquals('VoteRecorded', id, 'chainId', '10');
      assert.fieldEquals('VoteRecorded', id, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', id, 'blockNumber', '1');
      assert.fieldEquals('VoteRecorded', id, 'contract', voteRecorded.address.toHexString());

      assert.entityCount('VoteRecorded', 2);

      // Vote Result
      const resultId = voter
        .toHexString()
        .concat('-')
        .concat(voteRecorded.params.chainId.toString())
        .concat('-')
        .concat(voteRecorded.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.entityCount('VoteResult', 2);
      assert.fieldEquals('VoteResult', resultId, 'voter', voter.toHexString());
      assert.fieldEquals('VoteResult', resultId, 'candidate', candidates.at(0).toHexString());
      assert.fieldEquals('VoteResult', resultId, 'epochId', epochId.toString());
      assert.fieldEquals('VoteResult', resultId, 'votePower', '100');
      assert.fieldEquals('VoteResult', resultId, 'voteCount', '1');
      assert.fieldEquals('VoteResult', resultId, 'contract', voteRecorded.address.toHexString());
    });
    test('user votes for himself (multi chain)', () => {
      const voteRecordedEvent = createVoteRecordedEvent(
        voter,
        BigInt.fromI32(8453),
        epochId,
        BigInt.fromI32(100),
        candidates
      );
      handleVoteRecorded(voteRecordedEvent);

      // User
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '3');

      // Vote Result
      const resultId = voter
        .toHexString()
        .concat('-')
        .concat('8453')
        .concat('-')
        .concat(voteRecordedEvent.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.entityCount('VoteResult', 3);
      // Don't understand that? why do we need that and how can it exceed one?
      assert.fieldEquals('VoteResult', resultId, 'voteCount', '1');
      assert.fieldEquals('VoteResult', resultId, 'epochId', epochId.toString());
      assert.fieldEquals('VoteResult', resultId, 'votePower', '100');
      assert.fieldEquals(
        'VoteResult',
        resultId,
        'contract',
        voteRecordedEvent.address.toHexString()
      );
      assert.fieldEquals('VoteResult', resultId, 'voter', voter.toHexString());
      assert.fieldEquals('VoteResult', resultId, 'candidate', candidates[0].toHexString());

      // Vote Recorded
      const voteResultId = voter
        .toHexString()
        .concat('-')
        .concat(voteRecordedEvent.address.toHexString())
        .concat('-')
        .concat(epochId.toString())
        .concat('-')
        .concat('8453');
      assert.entityCount('VoteRecorded', 3);
      assert.fieldEquals('VoteRecorded', voteResultId, 'voter', voter.toHexString());
      assert.fieldEquals('VoteRecorded', voteResultId, 'epochId', epochId.toString());
      assert.fieldEquals('VoteRecorded', voteResultId, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', voteResultId, 'blockNumber', '1');

      assert.fieldEquals(
        'VoteRecorded',
        voteResultId,
        'contract',
        voteRecordedEvent.address.toHexString()
      );
    });
  });

  describe('Integration', () => {
    beforeAll(() => clearStore());
    test('user nominates himself - old contract', () => {
      const nominationEventOld = createCandidateNominatedOldEvent(voter, epochId);
      handleCandidateNominatedOld(nominationEventOld);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '0');
    });

    test('user votes for himself - old contract', () => {
      const voteEventOld = createVoteRecordedOldEvent(
        voter,
        Bytes.fromI32(1),
        epochId,
        BigInt.fromI32(100)
      );
      handleVoteRecordedOld(voteEventOld);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '1');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '1');

      assert.entityCount('VoteRecorded', 1);
      const voteRecordId = voter
        .toHexString()
        .concat('-')
        .concat(voteEventOld.address.toHexString())
        .concat('-')
        .concat(epochId.toString())
        .concat('-')
        .concat('10');
      assert.fieldEquals('VoteRecorded', voteRecordId, 'voter', voter.toHexString());
      assert.fieldEquals('VoteRecorded', voteRecordId, 'chainId', '10');
      assert.fieldEquals('VoteRecorded', voteRecordId, 'epochId', epochId.toString());
      assert.fieldEquals('VoteRecorded', voteRecordId, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', voteRecordId, 'blockNumber', '1');
      assert.fieldEquals(
        'VoteRecorded',
        voteRecordId,
        'contract',
        voteEventOld.address.toHexString()
      );

      const voteRecordedId = voter
        .toHexString()
        .concat('-')
        .concat('10')
        .concat('-')
        .concat(voteEventOld.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.entityCount('VoteResult', 1);
      assert.fieldEquals('VoteResult', voteRecordedId, 'epochId', epochId.toString());
      assert.fieldEquals('VoteResult', voteRecordedId, 'votePower', '100');
      assert.fieldEquals('VoteResult', voteRecordedId, 'voteCount', '1');
      assert.fieldEquals('VoteResult', voteRecordedId, 'voter', voter.toHexString());
      assert.fieldEquals(
        'VoteResult',
        voteRecordedId,
        'contract',
        voteEventOld.address.toHexString()
      );
    });

    test('user nominates himself', () => {
      const nominateEvent = createCandidateNominatedEvent(voter, epochId);
      handleCandidateNominated(nominateEvent);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '1');
    });

    test('user votes for himself', () => {
      const voteEvent = createVoteRecordedEvent(
        voter,
        BigInt.fromI32(10),
        epochId,
        BigInt.fromI32(100),
        candidates
      );
      handleVoteRecorded(voteEvent);
      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '2');

      assert.entityCount('VoteRecorded', 2);
      const voteRecordId = voter
        .toHexString()
        .concat('-')
        .concat(voteEvent.address.toHexString())
        .concat('-')
        .concat(epochId.toString())
        .concat('-')
        .concat('10');
      assert.fieldEquals('VoteRecorded', voteRecordId, 'voter', voter.toHexString());
      assert.fieldEquals('VoteRecorded', voteRecordId, 'chainId', '10');
      assert.fieldEquals('VoteRecorded', voteRecordId, 'epochId', epochId.toString());
      assert.fieldEquals('VoteRecorded', voteRecordId, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', voteRecordId, 'blockNumber', '1');
      assert.fieldEquals('VoteRecorded', voteRecordId, 'contract', voteEvent.address.toHexString());

      const voteRecordedId = voter
        .toHexString()
        .concat('-')
        .concat('10')
        .concat('-')
        .concat(voteEvent.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.entityCount('VoteResult', 2);
      assert.fieldEquals('VoteResult', voteRecordedId, 'epochId', epochId.toString());
      assert.fieldEquals('VoteResult', voteRecordedId, 'votePower', '100');
      assert.fieldEquals('VoteResult', voteRecordedId, 'voteCount', '1');
      assert.fieldEquals('VoteResult', voteRecordedId, 'voter', voter.toHexString());
      assert.fieldEquals('VoteResult', voteRecordedId, 'candidate', candidates.at(0).toHexString());
      assert.fieldEquals('VoteResult', voteRecordedId, 'contract', voteEvent.address.toHexString());
    });

    test('user votes for himself cross chain', () => {
      const voteEventBase = createVoteRecordedEvent(
        voter,
        BigInt.fromI32(8453),
        epochId,
        BigInt.fromI32(100),
        candidates
      );
      handleVoteRecorded(voteEventBase);
      const voteEventEthereum = createVoteRecordedEvent(
        voter,
        BigInt.fromI32(1),
        epochId,
        BigInt.fromI32(100),
        candidates
      );
      handleVoteRecorded(voteEventEthereum);

      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '4');

      assert.entityCount('VoteRecorded', 4);
      const voteRecordIdBase = voter
        .toHexString()
        .concat('-')
        .concat(voteEventBase.address.toHexString())
        .concat('-')
        .concat(epochId.toString())
        .concat('-')
        .concat('8453');
      assert.fieldEquals('VoteRecorded', voteRecordIdBase, 'voter', voter.toHexString());
      assert.fieldEquals('VoteRecorded', voteRecordIdBase, 'chainId', '8453');
      assert.fieldEquals('VoteRecorded', voteRecordIdBase, 'epochId', epochId.toString());
      assert.fieldEquals('VoteRecorded', voteRecordIdBase, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', voteRecordIdBase, 'blockNumber', '1');
      assert.fieldEquals(
        'VoteRecorded',
        voteRecordIdBase,
        'contract',
        voteEventBase.address.toHexString()
      );

      assert.entityCount('VoteRecorded', 4);
      const voteRecordIdL1 = voter
        .toHexString()
        .concat('-')
        .concat(voteEventEthereum.address.toHexString())
        .concat('-')
        .concat(epochId.toString())
        .concat('-')
        .concat('1');
      assert.fieldEquals('VoteRecorded', voteRecordIdL1, 'voter', voter.toHexString());
      assert.fieldEquals('VoteRecorded', voteRecordIdL1, 'chainId', '1');
      assert.fieldEquals('VoteRecorded', voteRecordIdL1, 'epochId', epochId.toString());
      assert.fieldEquals('VoteRecorded', voteRecordIdL1, 'votePower', '100');
      assert.fieldEquals('VoteRecorded', voteRecordIdL1, 'blockNumber', '1');
      assert.fieldEquals(
        'VoteRecorded',
        voteRecordIdL1,
        'contract',
        voteEventEthereum.address.toHexString()
      );

      const voteRecordedIdBase = voter
        .toHexString()
        .concat('-')
        .concat('8453')
        .concat('-')
        .concat(voteEventBase.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.entityCount('VoteResult', 4);
      assert.fieldEquals('VoteResult', voteRecordedIdBase, 'epochId', epochId.toString());
      assert.fieldEquals('VoteResult', voteRecordedIdBase, 'votePower', '100');
      assert.fieldEquals('VoteResult', voteRecordedIdBase, 'voteCount', '1');
      assert.fieldEquals('VoteResult', voteRecordedIdBase, 'voter', voter.toHexString());
      assert.fieldEquals(
        'VoteResult',
        voteRecordedIdBase,
        'candidate',
        candidates.at(0).toHexString()
      );
      assert.fieldEquals(
        'VoteResult',
        voteRecordedIdBase,
        'contract',
        voteEventBase.address.toHexString()
      );

      const voteRecordedIdL1 = voter
        .toHexString()
        .concat('-')
        .concat('10')
        .concat('-')
        .concat(voteEventEthereum.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.entityCount('VoteResult', 4);
      assert.fieldEquals('VoteResult', voteRecordedIdL1, 'epochId', epochId.toString());
      assert.fieldEquals('VoteResult', voteRecordedIdL1, 'votePower', '100');
      assert.fieldEquals('VoteResult', voteRecordedIdL1, 'voteCount', '1');
      assert.fieldEquals('VoteResult', voteRecordedIdL1, 'voter', voter.toHexString());
      assert.fieldEquals(
        'VoteResult',
        voteRecordedIdL1,
        'candidate',
        candidates.at(0).toHexString()
      );
      assert.fieldEquals(
        'VoteResult',
        voteRecordedIdL1,
        'contract',
        voteEventEthereum.address.toHexString()
      );
    });

    test('user revokes his own vote from one cross chain vote', () => {
      const voteEventEthereum = createVoteRecordedEvent(
        voter,
        BigInt.fromI32(1),
        epochId,
        BigInt.fromI32(100),
        [Address.fromString('0x0000000000000000000000000000000000000000')]
      );
      handleVoteRecorded(voteEventEthereum);

      assert.entityCount('User', 1);
      assert.fieldEquals('User', voter.toHexString(), 'nominationCount', '2');
      assert.fieldEquals('User', voter.toHexString(), 'votingCount', '3');

      assert.entityCount('VoteRecorded', 3);
      const voteRecordIdL1 = voter
        .toHexString()
        .concat('-')
        .concat(voteEventEthereum.address.toHexString())
        .concat('-')
        .concat(epochId.toString())
        .concat('-')
        .concat('1');
      assert.notInStore('VoteRecorded', voteRecordIdL1);

      const voteRecordedIdL1 = voter
        .toHexString()
        .concat('-')
        .concat('10')
        .concat('-')
        .concat(voteEventEthereum.address.toHexString())
        .concat('-')
        .concat(epochId.toString());
      assert.entityCount('VoteResult', 4);
      assert.fieldEquals('VoteResult', voteRecordedIdL1, 'epochId', epochId.toString());
      assert.fieldEquals('VoteResult', voteRecordedIdL1, 'votePower', '100');
      assert.fieldEquals('VoteResult', voteRecordedIdL1, 'voteCount', '1');
      assert.fieldEquals('VoteResult', voteRecordedIdL1, 'voter', voter.toHexString());
      assert.fieldEquals(
        'VoteResult',
        voteRecordedIdL1,
        'candidate',
        candidates.at(0).toHexString()
      );
      assert.fieldEquals(
        'VoteResult',
        voteRecordedIdL1,
        'contract',
        voteEventEthereum.address.toHexString()
      );
    });
  });
});
