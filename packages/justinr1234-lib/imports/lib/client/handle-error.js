import izitoast from 'izitoast';
import { _ } from 'meteor/underscore';
import { Random } from 'meteor/random';
import { pkgJson } from 'meteor/justinr1234:lib';
import { default as logFactory } from 'debug';

const handleErrorDefaultDebug = logFactory(`@${pkgJson.name}${__filename}`);

const validSeverities = ['info', 'success', 'warning', 'error'];

export const handleError = this.handleError = function handleError({
  error = null, // Meteor.Error type
  debug = null,
  dataLoadingErrors = null,
  useToast = true,
}) {
  const title = error && error.reason || 'Unknown Error';
  let toastMessage = 'Unknown Error';
  let toastSeverity = 'error';

  try {
    const parsed = JSON.parse(error && error.details);

    if (!parsed) {
      throw new Error('Invalid JSON parsed from error or error.details');
    }

    const { severity, message } = parsed;

    if (_.isString(severity) && validSeverities.includes(severity)) {
      toastSeverity = severity;
    }

    if (_.isString(message)) {
      toastMessage = message;
    }
  } catch (e) {
    if (_.isString(error && error.details)) {
      toastMessage = error.details;
    }
  }

  if (dataLoadingErrors) {
    dataLoadingErrors.set(Random.id(), error);
  }

  if (useToast) {
    return izitoast[toastSeverity]({ title, message: toastMessage });
  }

  const debugOut = debug || handleErrorDefaultDebug;
  debugOut(`${title}: ${toastMessage}`);
  debugOut(error);

  return error;
};

export const mapDataLoadingErrors = function mapDataLoadingErrors(dataLoadingErrors) {
  return _.map(dataLoadingErrors, (error, _id) => ({ _id, error }));
};
