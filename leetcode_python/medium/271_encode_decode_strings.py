class Codec:

    def encode(self, strs):
        # Encode the list of strings into a single string.
        # We append the length of each string followed by a colon and then the string itself.
        encoded_str = ""
        for s in strs:
            encoded_str += str(len(s)) + ":" + s
        return encoded_str

    def decode(self, encoded_str):
        # Decode the single string back into a list of strings.
        strs = []
        i = 0
        while i < len(encoded_str):
            # Find the next colon (which separates the length from the string).
            j = i
            while encoded_str[j] != ':':
                j += 1

            # Get the length of the string.
            length = int(encoded_str[i:j])

            # The string starts right after the colon and ends at the length specified.
            strs.append(encoded_str[j + 1: j + 1 + length])

            # Move i to the next encoded string.
            i = j + 1 + length

        return strs
