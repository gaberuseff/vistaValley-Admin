import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import Spinner from '../../ui/Spinner';
import useUpdateSettings from './useUpdateSettings';
import Button from '../../ui/Button';

function UpdateSettingsForm() {
    const {settings: 
      {minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice} = {}, 
      isSettingsLoading}= useSettings();

      const {updateSettings, isUpdating} = useUpdateSettings();

    const formInputs= [
      {id: 'minBookingLength', label: 'Minimum nights/booking' , defaultValue: minBookingLength},
      {id: 'maxBookingLength', label: 'Maximum nights/booking' , defaultValue: maxBookingLength},
      {id: 'maxGuestsPerBooking', label: 'Maximum guests/booking' , defaultValue: maxGuestsPerBooking},
      {id: 'breakfastPrice', label: 'Breakfast price' , defaultValue: breakfastPrice},
    ]

    if (isSettingsLoading) {
      return <Spinner/>
    }

    function handelUpdate(e, field) {
      e.preventDefault();

      const {value} = e.target;
      if (!value) return;

      updateSettings({[field]: value});
    }

  return (
    <Form>
     {formInputs.map((input) => (
       <FormRow key={input.id} label={input.label}>
         <Input type='number' id={input.id} defaultValue={input.defaultValue} 
         onBlur={(e) => handelUpdate(e, input.id)} disabled={isUpdating}/>
       </FormRow>
     ))}
    </Form>
  );
}

export default UpdateSettingsForm;