import {SubstrateEvent} from "@subql/types";
import {SumReward} from "../types";
import {Balance} from "@polkadot/types/interfaces";

function createSumReward(accountId: string): SumReward {
    const entity = new SumReward(accountId);
    entity.accountReward = BigInt(0);
    return entity;
}

export async function handleReward(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;
    let entity = await SumReward.get(account.toString());
    if (entity === undefined){
        entity = createSumReward(account.toString());
    }
    
    entity.blockheight = event.block.block.header.number.toNumber();
    entity.accountReward = entity.accountReward + (newReward as Balance).toBigInt();
        
    await entity.save();
}
