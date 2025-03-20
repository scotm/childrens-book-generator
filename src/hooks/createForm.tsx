import { AnimatedButton } from '@/components/ui/enhanced/animated-button';
import { LoadingSpinner } from '@/components/ui/icons';
import { createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';
import { fieldContext, formContext, useFormContext } from './createformContext';

const UploadThingField = lazy(() => import('@/components/create/UploadThingField'));

function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <div className="flex justify-end">
      <AnimatedButton
        type="submit"
        size="lg"
        disabled={form.state.isSubmitting || !form.state.canSubmit}
        className="rounded-full px-8 shadow-lg shadow-primary/20"
        animationType="bounce"
      >
        {form.state.isSubmitting ? (
          <div className="flex items-center gap-2">
            Generating Story...
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {label}
            <span className="ml-2">✨</span>
          </>
        )}
      </AnimatedButton>
    </div>
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
