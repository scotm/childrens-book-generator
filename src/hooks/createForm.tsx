import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext, useFormContext } from './createformContext';
import { lazy } from 'react';

const UploadThingField = lazy(() => import('@/components/create/UploadThingField'));

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button type="submit" disabled={isSubmitting}>
          {label}
        </button>
      )}
    </form.Subscribe>
  );
}

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    UploadThingField: UploadThingField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
