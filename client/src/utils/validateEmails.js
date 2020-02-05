// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// creates an array with the emails in a wrong form
export default emails => {
  // if (emails.indexOf(',') === -1) {
  //   console.log('no commas ! ');
  // }
  // console.log('commas', emails.indexOf(','));

  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  const numOfEmails = emails.split(' ').length;
  const numOfCommas = parseInt(emails.split(',').length - 1);
  if (invalidEmails)
    if (numOfEmails - numOfCommas > 1) {
      return "Not enough commas - please put a comma (e.g ',') between every two emails emails";
    } else if (numOfEmails - numOfCommas < 1) {
      return "Too Many commas - please put a comma (e.g ',') between every two emails emails";
    }
  if (invalidEmails.length && invalidEmails.length === 1) {
    return `This email is invalid: ${(' ', invalidEmails)}`;
  } else if (invalidEmails.length && invalidEmails.length > 1) {
    return `These emails are invalid: ${(' ', invalidEmails)}`;
  }

  return;
};
