// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const yupSync = (schema: { [key: string]: any }) => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validator({ field }: { field: string }, value: any) {
    await schema.validateSyncAt(field, { [field]: value });
  },
});
