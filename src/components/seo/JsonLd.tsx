/**
 * JsonLd Component
 * Renders structured data as JSON-LD script
 */

import React from 'react';

interface JsonLdProps {
  schema: any;
}

export const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLd;
