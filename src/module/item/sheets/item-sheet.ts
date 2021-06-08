import { RANKS } from "../../constants";
import { IronswornRollDialog } from "../../helpers/roll";
import { IronswornItem } from "../item";
/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class IronswornItemSheet extends ItemSheet<ItemSheet.Data<IronswornItem>, IronswornItem> {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: ['ironsworn', 'sheet', 'item'],
      width: 520,
      height: 480
    } as BaseEntitySheet.Options)
  }

  /* -------------------------------------------- */
  /** @override */
  get template () {
    const path = 'systems/foundry-ironsworn/templates/item'
    return `${path}/${this.item.data.type}.hbs`
  }

  /* -------------------------------------------- */

  /** @override */
  getData () {
    const data: any = super.getData()

    data.ranks = RANKS

    return data
  }

  /* -------------------------------------------- */

  /** @override */
  setPosition (options = {}) {
    const position = super.setPosition(options)
    const sheetBody = this.element.find('.sheet-body')
    const bodyHeight = position.height - 82
    sheetBody.css('height', bodyHeight)
    return position
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners (html) {
    super.activateListeners(html)

    // Activate roll links
    html.find('a.inline-roll').on('click', ev => {
      ev.preventDefault()
      const el = ev.currentTarget
      const moveTitle = `${this.object.name} (${el.dataset.param})`
      const actor = this.object.actor
      return IronswornRollDialog.showDialog(actor?.data.data, el.dataset.param, moveTitle)
    })

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return

    html.find('.delete-field').click(async ev => {
      ev.preventDefault()
      const idx = parseInt(
        $(ev.target)
          .parents('.item-row')
          .data('idx')
      )
      const fields = Object.values(this.item.data.data.fields)
      fields.splice(idx, 1)
      await this.item.update({ 'data.fields': fields })
    })
    html.find('.add-field').click(async _ev => {
      const fields = Object.values(this.item.data.data.fields)
      fields.push({ name: '', value: '' })
      await this.item.update({ 'data.fields': fields })
    })

    html.find('.track-target').click(async ev => {
      const newValue = parseInt(ev.currentTarget.dataset.value)
      await this.item.update({ 'data.track.current': newValue })
    })

    // Vow progress buttons
    html.find('.markProgress').click(ev => {
      ev.preventDefault()
      return this.item.markProgress()
    })
    html.find('.fulfillProgress').click(ev => {
      ev.preventDefault()
      return this.item.fulfill()
    })
    html.find('.clearProgress').click(ev => {
      ev.preventDefault()
      return this.item.clearProgress()
    })
    html.find('.delete').click(async ev => {
      ev.preventDefault()
      await Dialog.confirm({
        title: game.i18n.localize('IRONSWORN.DeleteItem'),
        content: `<p>${game.i18n.localize('IRONSWORN.ConfirmDelete')}</p>`,
        yes: () => this.item.delete(),
        defaultYes: false
      })
    })

    // Bonds
    html.find('.add-bond').click(_ev => {
      const bonds = Object.values(this.item.data.data.bonds)
      bonds.push({ name: '', notes: '' })
      return this.item.update({ 'data.bonds': bonds })
    })
    html.find('.delete-bond').click(async ev => {
      ev.preventDefault()
      const idx = parseInt(
        $(ev.target)
          .parents('.item-row')
          .data('idx')
      )
      const bonds = Object.values(this.item.data.data.bonds)
      bonds.splice(idx, 1)
      await this.item.update({ 'data.bonds': bonds })
    })
  }
}