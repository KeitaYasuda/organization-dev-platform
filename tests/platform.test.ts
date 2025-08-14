import assert from 'node:assert/strict';
import { ImprovementPlatform } from '../src/platform';

const platform = new ImprovementPlatform();

const item = platform.addItem('タイトル', '説明');
assert.equal(platform.listItems().length, 1);

const opinion = platform.addOpinion('良いと思います', item.id);
platform.supportOpinion(opinion.id);
assert.equal(opinion.supportCount, 1);

const newOpinion = platform.addOpinion('新しい案');
assert.equal(platform.listNewItemOpinions().length, 1);
assert.equal(platform.listNewItemOpinions()[0].id, newOpinion.id);

assert.throws(() => platform.addOpinion('無効', 999));
assert.equal(platform.supportOpinion(999), false);

console.log('platform tests passed');
