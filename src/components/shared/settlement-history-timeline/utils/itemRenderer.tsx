import { ReactCalendarItemRendererProps } from "react-calendar-timeline";
import { Item } from ".";
import { ItemTooltip } from "../ItemTooltip";
import "../style.scss";

export const itemRenderer = ({
  getItemProps,
  getResizeProps,
  item,
  itemContext,
}: ReactCalendarItemRendererProps<Item>) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  return (
    <ItemTooltip item={item}>
      <div {...getItemProps({})}>
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}

        <div
          className="rct-item-content"
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
      </div>
    </ItemTooltip>
  );
};
