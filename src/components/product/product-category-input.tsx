import SelectInput from '@components/ui/select-input';
import Label from '@components/ui/label';
import { Control, useFormState, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useCategoriesQuery } from '@data/category/use-categories.query';
import { useTranslation } from 'next-i18next';
import { useCategoriesAllQuery } from '@data/category/use-categories-all.query';

interface Props {
  control: Control<any>;
  setValue: any;
}

const ProductCategoryInput = ({ control, setValue }: Props) => {
  const { t } = useTranslation('common');
  const type = useWatch({
    control,
    name: 'type',
  });
  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (type?._id && dirtyFields?.type) {
      setValue('categories', []);
    }
  }, [type?._id]);

  const { data, isLoading: loading } = useCategoriesAllQuery({
    limit: 999,
    page: 1,
    type: type._id,
  });

  return (
    <div className="mb-5">
      <Label>{t('form:input-label-categories')}</Label>
      <SelectInput
        name="categories"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option._id}
        // @ts-ignore
        options={data?.categories?.data}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductCategoryInput;
