'use strict';

require('../common');

// This tests that the prototype accessors added by StreamBase::AddMethods
// do not raise assersions when called with incompatible receivers.

const assert = require('assert');

// Or anything that calls StreamBase::AddMethods when setting up its prototype
const TTY = process.binding('tty_wrap').TTY;

{
  // Should throw instead of raise assertions
  const msg = /TypeError: Illegal invocation/;
  assert.throws(() => {
    TTY.prototype.bytesRead;
  }, msg);

  assert.throws(() => {
    TTY.prototype.fd;
  }, msg);

  assert.throws(() => {
    TTY.prototype._externalStream;
  }, msg);

  // Should not throw for Object.getOwnPropertyDescriptor
  assert.strictEqual(
    typeof (Object.getOwnPropertyDescriptor(TTY.prototype, 'bytesRead')),
    'object'
  );

  assert.strictEqual(
    typeof (Object.getOwnPropertyDescriptor(TTY.prototype, 'fd')),
    'object'
  );

  assert.strictEqual(
    typeof (Object.getOwnPropertyDescriptor(TTY.prototype, '_externalStream')),
    'object'
  );
}
