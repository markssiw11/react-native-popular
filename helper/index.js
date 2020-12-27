
export const currencyFormat = (num, lang, fixed = 0) => {
  switch (lang) {
    case 'en':
      return (
        '$' + num?.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      );
    case 'vi':
      return (
        num?.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
        ' ' +
        'VND'
      );
    default:
      return (
        num?.toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
        ' ' +
        'VND'
      );
  }
};
