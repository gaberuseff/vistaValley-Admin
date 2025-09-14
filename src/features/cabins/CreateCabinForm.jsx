import styled from "styled-components";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import useCreateCabin from "./useCreateCabin";
import { useForm } from "react-hook-form";
import useUpdateCabin from "./useUpdateCabin";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm({cabinToUpdate = {}, onCloseModal}) {
  const {id: updateId, ...updateValues} = cabinToUpdate;
  const isUpdateSession = !!updateId;

  const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  
  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data?.image === 'string' ? data?.image : data?.image[0];
    
    if (isUpdateSession) {
      updateCabin({newCabin: {...data, image}, id: updateId},
        {
          onSuccess : ()=> {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin({ ...data, image },
        {
          onSuccess : ()=> {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  // function onError(err) {
  //   console.log(err)
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" errors={errors?.name} >
        <Input type="text" id="name" 
        {...register("name", { required: 'Cabin name is required' })}
        disabled={isWorking} />
      </FormRow>

      <FormRow label="Maximum capacity" errors={errors?.maxCapacity} >
        <Input type="number" id="maxCapacity" 
        {...register("maxCapacity", { required: 'Maximum capacity is required' })}
        disabled={isWorking} />
      </FormRow>

      <FormRow label="Regular price" errors={errors?.regularPrice} >
        <Input type="number" id="regularPrice" 
        {...register("regularPrice", { required: 'Regular price is required' })}
        disabled={isWorking} />
      </FormRow>

      <FormRow label="Discount" errors={errors?.discount} >
        <Input type="number" id="discount" 
        {...register("discount", {
          validate: (value) => {
            value < getValues('regularPrice') || 'Discount must be less than regular price'
          }
        })} defaultValue={0}
        disabled={isWorking} />
      </FormRow>

      <FormRow label="Description for website" errors={errors?.description} >
        <Textarea type="number" id="description" 
        {...register("description", { required: 'Description is required' })} defaultValue=""/>
      </FormRow>

      <FormRow label="Cabin photo" errors={errors?.image} >
        <FileInput id="image" accept="image/*" 
        {...register("image", { required: isUpdateSession ? false : 'Image is required' })} />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" size="medium" type="reset" 
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" variations="primary" size="medium" 
          disabled={isWorking}>
          {isUpdateSession ? "Update cabin" : "Create cabin"}
        </Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
