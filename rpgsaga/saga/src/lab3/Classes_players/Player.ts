import { Weapon } from "../Classes_weapons/Weapon";
import { Hit } from "../Class_hit";
import { Ability } from "../Classes_abilities/Ability";
import { activation_ability } from "../Classes_abilities/using_abilities";
import { Debuff } from "../Classes_debuff/Debuff";
import { damage_types } from "../Utils/list_damage_types";

export abstract class Player{
    private _name: String;
    private _role: String;
    private _weapon: Weapon; 
    private _health: number;
    private _physical_resistance: number;
    private _magic_resistance: number;
    private _crit_damage: number;
    private _stuuned_states: boolean = false;
    private _ability: Ability;
    private _debuffs: (Debuff)[] = [];
    constructor(
        name: String,
        role: String,
        weapon: Weapon,
        health: number,
        physical_resistance: number,
        magic_resistance: number,
        crit_damage: number,
        ability: Ability
    ) {
        this._name = name;
        this._role = role;
        this._weapon = weapon;
        this._health = health;
        this._physical_resistance = (physical_resistance + weapon.increase_phys_resist) * weapon.multiplier_phys_resist;
        this._magic_resistance = (magic_resistance + weapon.increase_magic_resist) * weapon.multiplier_magic_resist;
        this._crit_damage = crit_damage;
        this._ability = ability;
    }

    public set health(hp: number) {
        this._health = hp;
    }

    public set stuuned_states(state: boolean) {
        this._stuuned_states = state;
    }

    public set physical_resistance(value: number) {
        this._physical_resistance = value;
    }   

    public set magic_resistance(value: number) {
        this._magic_resistance = value;
    }

    public add_debuff(debuff: Debuff){
        this._debuffs.push(debuff);
    }

    public clear_debaffs() {
        this._debuffs.length = 0;
    }

    public get name(): String {
        return this._name;
    }

    public get role(): String {
        return this._role;
    }

    public get health(): number {
        return this._health;
    }

    public get damage(): number {
        return this._weapon.damage
    }

    public get type_damage(): String {
        return this._weapon.type_damage
    }

    public get stuuned_states(): boolean {
        return this._stuuned_states;
    }

    public get physical_resistance(): number {
        return this._physical_resistance;
    }

    public get magic_resistance(): number {
        return this._magic_resistance;
    }

    public get crit_damage(): number {
        return this._crit_damage;
    }

    public attack(): Hit {
        let hit = new Hit(this._weapon.damage, this._weapon.type_damage, false)
        hit = activation_ability([this._ability, this._weapon.ability], this, hit)
        return hit
    }

    public taking_damage(hit: Hit) {
        if (hit.control) {
            this._stuuned_states = true;
        }
        if (hit.type_damage == damage_types.pure) {
            this._health -= hit.damage
        } else if (hit.type_damage == damage_types.phys) {
            this.health = this.health - (Math.floor(hit.damage * ((100 - this.physical_resistance) / 100))) ; 
        } else if (hit.type_damage == damage_types.mag){
            this.health = this.health - (Math.floor(hit.damage * ((100 - this.magic_resistance) / 100)));  
        }
    }

    public activate_debaffs() {
        for (let debuff of this._debuffs) {
            if (debuff.duration > 0) {
                this.taking_damage(debuff.activate_debuff());
                debuff.duration = debuff.duration - 1;
            }
        }
    }
}