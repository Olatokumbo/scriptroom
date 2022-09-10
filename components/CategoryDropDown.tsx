import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { SelectInputProps } from "@material-ui/core/Select/SelectInput";
import categories from "../utils/category.json";

interface ICategoryDropdown {
  value: any;
  onChange: SelectInputProps["onChange"];
}
const CategoryDropDown: React.FC<ICategoryDropdown> = (props) => {
  return (
    <FormControl margin="dense">
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={categories[0].id}
        label="Category"
        {...props}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropDown;
