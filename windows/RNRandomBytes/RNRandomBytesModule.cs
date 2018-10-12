using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;
using Windows.Storage.Streams;
using Windows.Security.Cryptography;

namespace Random.Bytes.RNRandomBytes
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNRandomBytesModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNRandomBytesModule"/>.
        /// </summary>
        internal RNRandomBytesModule()
        {
        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNRandomBytes";
            }
        }

        [ReactMethod]
        public void randomBytes(uint size, IPromise promise)
        {
            promise.Resolve(this.getRandomBytes(size));
        }

        private string getRandomBytes(uint size)
        {
            IBuffer buffer = CryptographicBuffer.GenerateRandom(size);
            return CryptographicBuffer.EncodeToHexString(buffer);
        }

    }
}