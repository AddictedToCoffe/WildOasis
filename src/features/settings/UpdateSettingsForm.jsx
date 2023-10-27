import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e) {
    const { value, defaultValue, id } = e.target;
    if (!value || value === defaultValue || value < 0) return;
    updateSetting({ [id]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={handleUpdate}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
