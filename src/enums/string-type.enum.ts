export enum StringType {
  /**
   * String with length from 0 to 255.
   */
  Small = 0,
  /**
   * String with length from 256 to 65535.
   */
  Medium = 1,
  /**
   * String with length from 65536 to 4294967295.
   */
  Large = 2,
}
