import { Player } from "../../Classes_players/Player";
import { Hit } from "../../Class_hit";

export function activation_warriro_ability(player: Player, hit: Hit): Hit {
    hit.damage = hit.damage + Math.floor((player.physical_resistance + player.magic_resistance) * 0.5);
    return hit;
}