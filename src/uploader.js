import ajax from '@codexteam/ajax';

/**
 * Module for file uploading.
 */
export default class Uploader {
  /**
   * @param config.config
   * @param {object} config
   * @param {Function} onUpload - callback for successful file upload
   * @param {Function} onError - callback for uploading errors
   * @param config.onUpload
   * @param config.onError
   */
  constructor({ config, onUpload, onError }) {
    this.config = config;
    this.onUpload = onUpload;
    this.onError = onError;
  }

  /**
   * Handle clicks on the upload file button
   *
   * @fires ajax.transport()
   * @param {Function} onPreview - callback fired when preview is ready
   */
  uploadSelectedFile({ onPreview }) {
    ajax.transport({
      url: this.config.endpoint,
      accept: this.config.types,
      headers: this.config.additionalRequestHeaders,
      beforeSend: () => onPreview(),
      fieldName: this.config.field,
    }).then((response) => {
      this.onUpload(response);
    })
      .catch((error) => {
        const message = (error && error.message) ? error.message : this.config.errorMessage;

        this.onError(message);
      });
  }
}
