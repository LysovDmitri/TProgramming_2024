import { Warrior } from "./Class_players/Warrior";
import { Archer } from "./Class_players/Archer";
import { Mage } from "./Class_players/Mage";
import { Weapon } from "./Class_weapon/Weapon";
import { random_value_array } from "./Utils/random_v_arr";
import { random_weapon } from "./Utils/random_weapon";
import { fight } from "./fight";
import { Paladin_Shield } from "./Class_weapon/Classes/Paladin_Shield";
const arr_name: String[] = ["Ivan", "Dima", "Alex", "Jhon", "Sergey"];
export enum Wepon_damage {
    "Sword" = 10,
    "Bow" = 15,
}
const weapon_1 = new Paladin_Shield()
const pers_1 = new Warrior(random_value_array(arr_name), weapon_1, 100)
console.log(pers_1.magic_resistance)
console.log(pers_1.physical_resistance)

