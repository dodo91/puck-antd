import ButtonBlock from "./ButtonBlock";
import CardBlock from "./CardBlock";
import ColBlock from "./ColBlock";
import DatePickerBlock from "./DatePickerBlock";
import FormBlock from "./FormBlock";
import FormItemBlock from "./FormItemBlock";
import InputBlock from "./InputBlock";
import RowBlock from "./RowBlock";
import SelectBlock from "./SelectBlock";
import TableBlock from "./TableBlock";
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
  Table: TableBlock,
  Typography: TypographyBlock,
};

export default blocks;
