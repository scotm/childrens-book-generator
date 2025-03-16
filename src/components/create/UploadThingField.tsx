import { useFieldContext } from '@/hooks/createformContext';
import React from 'react';
import { CloseIcon } from '../ui/icons';
import { UploadButton } from '@/lib/utils/uploadthing';
import '@uploadthing/react/styles.css';

type UploadThingFieldAppearance = {
  button?: string;
  container?: string;
  allowedContent?: string;
  clearBtn?: string;
};

const uploadThingAppearance: UploadThingFieldAppearance = {
  button:
    'ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400',
  container: 'w-max flex-row rounded-md border-cyan-300 bg-slate-800',
  allowedContent: 'flex h-8 flex-col items-center justify-center px-2 text-white',
};

type EndpointArg = 'childImageUploader' | 'petImageUploader';

const EndpointToAltText: Record<EndpointArg, string> = {
  childImageUploader: 'A photo of your child',
  petImageUploader: 'A photo of your pet',
};

export const UploadThingField = ({ endpoint }: { endpoint: EndpointArg }) => {
  const field = useFieldContext<string>();

  return (
    <div className="mt-2">
      {field.state.value ? (
        <div className="relative w-full rounded-md overflow-hidden mb-2">
          <img
            src={field.state.value}
            alt={EndpointToAltText[endpoint]}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => field.handleChange('')}
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <div className="h-full border-2 border-dashed border-input border-black rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors">
          <UploadButton
            appearance={uploadThingAppearance}
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
              field.handleChange(res[0].ufsUrl);
            }}
            onUploadError={(error: Error) => {
              console.error(`Error uploading child photo: ${error.message}`);
            }}
          />
          <p className="text-sm mt-2">Upload a photo of your child (optional)</p>
        </div>
      )}
    </div>
  );
};

export default UploadThingField;
