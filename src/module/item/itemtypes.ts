import { RANKS } from '../constants'

interface ProgressBase {
  rank: keyof typeof RANKS
  current: number
}

///////////////////////////////

interface AssetField {
  name: string
  value: string
}

interface AssetAbility {
  name?: string
  enabled: boolean
  description: string
}

interface AssetExclusiveOption {
  name: string
  selected: boolean
}

interface AssetData {
  fields: AssetField[]
  abilities: AssetAbility[]
  track: {
    enabled: boolean
    name: string
    current: number
    max: number
  }
  exclusiveOptions: AssetExclusiveOption[]
}

export interface AssetItemData extends Item.Data<AssetData> {
  type: 'asset'
}

///////////////////////////////

type ProgressData = ProgressBase

export interface ProgressItemData extends Item.Data<ProgressData> {
  type: 'progress'
}

///////////////////////////////

interface VowData extends ProgressBase {
  description: string
  threat: string
  menace: number
}

export interface VowItemData extends Item.Data<VowData> {
  type: 'vow'
}

///////////////////////////////

interface BondsetBond {
  name: string
  notes: string
}

interface BondsetData {
  bonds: BondsetBond[]
}

export interface BondsetItemData extends Item.Data<BondsetData> {
  type: 'bondset'
}

///////////////////////////////

interface Bond {
  name: string
  description: string
}

export interface BondItemData extends Item.Data<Bond> {
  type: 'bond'
}

///////////////////////////////

interface SiteData extends ProgressBase {
  objective: string
  theme: string
  domain: string
  notes: string
}

export interface SiteItemData extends Item.Data<SiteData> {
  type: 'site'
}

///////////////////////////////

interface MoveData {
  description: string
  strong: string
  weak: string
  miss: string
  stats: string[]
}

export interface MoveItemData extends Item.Data<MoveData> {
  type: 'move'
}

///////////////////////////////

export type IronswornItemData = AssetItemData | ProgressItemData | VowItemData | BondItemData | BondsetItemData | SiteItemData | MoveItemData
