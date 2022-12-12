/*
    DiepCustom - custom tank game server that shares diep.io's WebSocket protocol
    Copyright (C) 2022 ABCxFF (github.com/ABCxFF)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>
*/

import Bullet from "./Bullet";
import LivingEntity from "../../Live";
import Barrel from "../Barrel";

import { HealthFlags, PositionFlags, PhysicsFlags, Stat, StyleFlags } from "../../../Const/Enums";
import { TankDefinition } from "../../../Const/TankDefinitions";
import TankBody, { BarrelBase } from "../TankBody";
import { EntityStateFlags } from "../../../Native/Entity";
import AbstractShape from "../../Shape/AbstractShape";

export default class LifestealBullet extends Bullet {
    public stealPlayerFactor = 0.8;
    public stealShapeFactor = 0.15;
    public stealOtherFactor = 0.01;

    public onDamage(entity: LivingEntity, damageDealt: number) {
        if (!this.tank.healthData) return;
        let stealFactor: number = 0;

        if (entity instanceof TankBody) stealFactor = this.stealPlayerFactor ;
        else if (entity instanceof AbstractShape) stealFactor = this.stealShapeFactor; 
        else stealFactor = this.stealOtherFactor;


        this.tank.healthData.health = Math.min(this.tank.healthData.values.health + damageDealt * stealFactor, this.tank.healthData.values.maxHealth);
    }
}