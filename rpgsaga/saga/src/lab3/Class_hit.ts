export class Hit{
    private _damage: number;
    private _type_damage: String;
    private _control: boolean;
    constructor (
        damage: number,
        type_damage: String,
        control: boolean,
    ) {
        this._damage = damage;
        this._type_damage = type_damage;
        this._control = control;
    };

    public set damage(value: number) {
        this._damage = value;
    }

    public set control(value: boolean) {
        this._control = value;
    }

    public get damage(): number {
        return this._damage;
    }

    public get type_damage(): String {
        return this._type_damage;
    }

    public get control(): boolean {
        return this._control;
    }
}