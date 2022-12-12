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
import Explosion from "./Explosion";
import Barrel from "../Barrel";

import { HealthFlags, PositionFlags, PhysicsFlags, Stat, StyleFlags } from "../../../Const/Enums";
import { TankDefinition } from "../../../Const/TankDefinitions";
import TankBody, { BarrelBase } from "../TankBody";
import { EntityStateFlags } from "../../../Native/Entity";
import AbstractShape from "../../Shape/AbstractShape";

export default class LifestealBullet extends Bullet {
    public onDeath(killer: LivingEntity) {
        const size = this.physicsData.size;
        const explosion = new Explosion(this, this.tank, 20, 5, size, size * 5);
    }
}