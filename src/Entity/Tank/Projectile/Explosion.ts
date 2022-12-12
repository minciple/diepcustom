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

import { HealthFlags, PositionFlags, PhysicsFlags, Stat, StyleFlags, Color, Tank } from "../../../Const/Enums";
import { TankDefinition } from "../../../Const/TankDefinitions";
import TankBody, { BarrelBase } from "../TankBody";
import { EntityStateFlags } from "../../../Native/Entity";
import AbstractShape from "../../Shape/AbstractShape";
import ObjectEntity from "../../Object";
import { lerp } from "../../../util";

export default class Explosion extends LivingEntity {
    protected tank: BarrelBase;
    protected initalRadius: number;
    protected finalRadius: number;
    protected duration: number;
    protected spawnTick: number;

    constructor(bullet: Bullet, tank: BarrelBase, force: number, duration: number, initalRadius: number, finalRadius: number = initalRadius) {
        super(bullet.game);
        this.tank = tank;
        this.initalRadius = initalRadius;
        this.finalRadius = finalRadius;
        this.duration = duration;
        this.spawnTick = bullet.game.tick;

        this.relationsData.values.team = bullet.relationsData.values.team;
        this.relationsData.values.owner = bullet.relationsData.values.owner;

        this.physicsData.values.sides = 1;
        this.physicsData.values.size = bullet.physicsData.values.size * 2;
        this.physicsData.values.flags |= PhysicsFlags.noOwnTeamCollision | PhysicsFlags.canEscapeArena;
        this.physicsData.values.absorbtionFactor = 0;
        this.physicsData.values.pushFactor = force;
        
        this.damageReduction = 0;
        this.damagePerTick = 0;

        this.styleData.values.flags |= StyleFlags.hasNoDmgIndicator;
        this.styleData.values.color = Color.NecromancerSquare;
        this.styleData.values.opacity = 0.5;

        this.healthData.values.flags = HealthFlags.hiddenHealthbar;
        this.healthData.values.health = this.healthData.values.maxHealth = 10000;


        this.positionData.values.x = bullet.positionData.values.x;
        this.positionData.values.y = bullet.positionData.values.y;
    }

     /** Extends LivingEntity.onKill - passes kill to the owner. */
     public onKill(killedEntity: LivingEntity) {
        // TODO(ABC):
        // Make this, work differently
        /** @ts-ignore */
        if (typeof this.tank.onKill === 'function') this.tank.onKill(killedEntity);
    }

    public tick(tick: number) {
        super.tick(tick);

        const timeAlive = tick - this.spawnTick;
        this.physicsData.size = lerp(this.initalRadius, this.finalRadius, Math.min(timeAlive / this.duration, 1))

        if (timeAlive > this.duration) {
            this.destroy(false);
        }
    }
}