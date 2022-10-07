export const formatDate = (value: string) => {
  try {
    const date = new Date(value)

    if (date) {
      return new Intl.DateTimeFormat('en-GB').format(date)
    }
    return '-'
  } catch (error: any) {
    return error?.message
  }
}
