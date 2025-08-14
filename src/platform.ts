export interface ImprovementItem {
  id: number;
  title: string;
  description: string;
  opinions: Opinion[];
}

export interface Opinion {
  id: number;
  /**
   * ID of the improvement item this opinion belongs to.
   * If undefined, the opinion is a proposal for a new item.
   */
  itemId?: number;
  content: string;
  supportCount: number;
}

/**
 * Simple in-memory platform to manage improvement items and opinions.
 * This is a starting point and should be replaced with persistent storage in production.
 */
export class ImprovementPlatform {
  private items: ImprovementItem[] = [];
  private opinions: Opinion[] = [];
  private nextItemId = 1;
  private nextOpinionId = 1;

  listItems(): ImprovementItem[] {
    return this.items;
  }

  addItem(title: string, description: string): ImprovementItem {
    const item: ImprovementItem = {
      id: this.nextItemId++,
      title,
      description,
      opinions: [],
    };
    this.items.push(item);
    return item;
  }

  addOpinion(content: string, itemId?: number): Opinion {
    if (itemId !== undefined) {
      const item = this.items.find(i => i.id === itemId);
      if (!item) {
        throw new Error(`Improvement item ${itemId} not found`);
      }
    }

    const opinion: Opinion = {
      id: this.nextOpinionId++,
      itemId,
      content,
      supportCount: 0,
    };
    this.opinions.push(opinion);
    if (itemId !== undefined) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        item.opinions.push(opinion);
      }
    }
    return opinion;
  }

  supportOpinion(opinionId: number): boolean {
    const opinion = this.opinions.find(o => o.id === opinionId);
    if (!opinion) {
      return false;
    }
    opinion.supportCount++;
    return true;
  }

  listOpinionsForItem(itemId: number): Opinion[] {
    return this.opinions.filter(o => o.itemId === itemId);
  }

  listNewItemOpinions(): Opinion[] {
    return this.opinions.filter(o => o.itemId === undefined);
  }
}
