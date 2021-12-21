"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReward = void 0;
const types_1 = require("../types");
function createSumReward(accountId) {
    const entity = new types_1.SumReward(accountId);
    entity.accountReward = BigInt(0);
    return entity;
}
async function handleReward(event) {
    const { event: { data: [account, newReward] } } = event;
    let entity = await types_1.SumReward.get(account.toString());
    if (entity === undefined) {
        entity = createSumReward(account.toString());
    }
    entity.blockheight = event.block.block.header.number.toNumber();
    entity.accountReward = entity.accountReward + newReward.toBigInt();
    await entity.save();
}
exports.handleReward = handleReward;
