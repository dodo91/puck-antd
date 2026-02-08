import ButtonBlock from "./ButtonBlock";
import CardBlock from "./CardBlock";
import ColBlock from "./ColBlock";
import DatePickerBlock from "./DatePickerBlock";
import FormBlock from "./FormBlock";
import FormItemBlock from "./FormItemBlock";
import InputBlock from "./InputBlock";
import RowBlock from "./RowBlock";
import SelectBlock from "./SelectBlock";
import StackBlock from "./StackBlock";
import TableBlock from "./TableBlock";
import TabsBlock from "./TabsBlock";
import TypographyBlock from "./TypographyBlock";

const blocks = {
  Form: FormBlock,
  FormItem: FormItemBlock,
  Input: InputBlock,
  Button: ButtonBlock,
  Card: CardBlock,
  Select: SelectBlock,
  DatePicker: DatePickerBlock,
  Row: RowBlock,
  Col: ColBlock,
  Stack: StackBlock,
  Table: TableBlock,
  Tabs: TabsBlock,
  Typography: TypographyBlock,
};

export default blocks;
