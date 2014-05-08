var sBox = [0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
			0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
			0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
			0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
			0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
			0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
			0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
			0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
			0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
			0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
			0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
			0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
			0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
			0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
			0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
			0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16];
var iBox = [0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
			0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
			0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
			0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
			0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
			0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
			0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
			0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
			0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
			0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
			0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
			0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
			0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
			0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
			0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
			0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D];
var rCon = [0x8D, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1B, 0x36];
var nBit = 128;
var nByte = nBit >> 3;
var nRound = (nByte / 4) + 6;
/**
 * @param {String} character representation
 * @return {Number[]} unicode representation
 */
function toHexadecimal(s)
{
	var res = [];
	for (var i = 0; i < s.length; i++)
		res[i] = s.charCodeAt(i);
	return res;
}
/**
 * @param {Number[]} unicode representation
 * @return {String} unicode representation
 */
function toHexadecimalString(s)
{
	var res = "";
	for (var i = 0; i < s.length; i++)
	{
		var tmp = '0' + s[i].toString(16).toUpperCase();
		res += tmp.substr(tmp.length - 2);
	}
	return res;
}
/**
 * @param {Number[]} unicode representation
 * @return {String} character representation
 */
function fromHexadecimal(s)
{
	var res = "";
	for (var i = 0; i < s.length && s[i]; i++)
		res += String.fromCharCode(s[i]);
	return res;
}
/**
 * @param {String} unicode representation
 * @return {Number[]} unicode representation
 */
function fromHexadecimalString(s)
{
	var res = [];
	for (var i = 0; i < (s.length >> 1); i++)
		res[i] = 0;
	for (var i = 0; i < s.length; i++)
		res[i >> 1] = res[i >> 1] ^ (parseInt(s[i], 16) << ((i & 1) ? 0 : 4));
	return res;
}
/**
 * @param {Number} multiplicand
 * @param {Number} multiplier
 * @return {Number} Galois Field (GF) Multiplication of n with k
 */
function multiply(n, k)
{
	switch(k)
	{
		case 2:
			n <<= 1;
			if (n & 0x100)
				return n ^ 0x11B;
			return n;
			break;
		case 3:
			return n ^ multiply(n, 2);
			break;
		case 9:
			return n ^ multiply(multiply(multiply(n, 2), 2), 2);
			break;
		case 11:
			return n ^ multiply(n ^ multiply(multiply(n, 2), 2), 2);
			break;
		case 13:
			return n ^ multiply(multiply(n ^ multiply(n, 2), 2), 2);
			break;
		case 14:
			return multiply(n ^ multiply(n ^ multiply(n, 2), 2), 2);
			break;
	}
	return 0;
}
/**
 * @param {Number[]} initial round key
 * @return {Number[][][]} scheduled round key
 */
function generateRoundKey(key)
{
	var col = 4;
	var row = nByte / col;
	var res = [];
	res[0] = [];
	for (var i = 0; i < row; i++)
	{
		res[0][i] = [];
		for (var j = 0; j < col; j++)
			res[0][i][j] = key[j * row + i];
	}
	for (var i = 0; i < nRound; i++)
	{
		res[i + 1] = [];
		/* for first column, rotate and substitute, xor with preceding round */
		for (var j = 0; j < row; j++)
		{
			res[i + 1][j] = [];
			res[i + 1][j][0] = sBox[res[i][(j + 1) % row][3]] ^ res[i][j][0];
		}
		/* for first row and column, xor with round constant */
		res[i + 1][0][0] ^= rCon[i + 1];
		/* for other column, preceding column xor with preceding round */
		for (var j = 0; j < row; j++)
			for (var k = 1; k < col; k++)
				res[i + 1][j][k] = res[i + 1][j][k - 1] ^ res[i][j][k];
	}
	return res;
}
/**
 * @param {String} string representation of plain text
 * @param {Number[]} key for encryption
 * @param {Number[]} initial vector for encryption
 * @return {String} string representation of cipher text
 */
function getCipher(s, k, iv)
{
	s = toHexadecimal(s);
	//s = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff];
	//s = [0x32, 0x43, 0xf6, 0xa8, 0x88, 0x5a, 0x30, 0x8d, 0x31, 0x31, 0x98, 0xa2, 0xe0, 0x37, 0x07, 0x34];
	var res = [];
	var key = generateRoundKey(k);
	//var iv = [];
	//var key = generateRoundKey([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
	//var key = generateRoundKey([0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c]);
	var nBlock = s.length / nByte + ((s.length % nByte) ? 1 : 0);
	/* pad with zeros */
	for (var i = s.length; i < (nBlock * nByte); i++)
		s[i] = 0;
	/* run aes encryption for every block */
	for (var i = 0; i < nBlock; i++)
	{
		/* xor with preceding block */
		for (var j = 0; j < nByte; j++)
			s[i * nByte + j] ^= iv[j];
		/* run aes encryption */
		iv = encrypt(s.slice(i * nByte, (i + 1) * nByte), key);
		/* keep current block result */
		for (var j = 0; j < nByte; j++)
			res[i * nByte + j] = iv[j];
	}
	res = toHexadecimalString(res);
	return res;
}
/**
 * @param {String} string representation of cipher text
 * @param {Number[]} key for decryption
 * @param {Number[]} initial vector for decryption
 * @return {String} string representation of plain text
 */
function getPlain(s, k, iv)
{
	/* assert no missing values */
	if (s.length % (nByte << 1))
		throw 'Missing Some Values';
	s = fromHexadecimalString(s);
	var res = [];
	var key = generateRoundKey(k);
	//var iv = [];
	//var key = generateRoundKey([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
	//var key = generateRoundKey([0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c]);
	var nBlock = s.length / nByte + ((s.length % nByte) ? 1 : 0);
	/* run aes decryption for every block */
	for (var i = 0; i < nBlock; i++)
	{
		/* run aes decryption */
		res = res.concat(decrypt(s.slice(i * nByte, (i + 1) * nByte), key));
		/* xor with preceding block */
		for (var j = 0; j < nByte; j++)
		{
			res[i * nByte + j] ^= iv[j];
			iv[j] = s[i * nByte + j];
		}
	}
	res = fromHexadecimal(res);
	return res;
}
/**
 * @param {Number[]} unicode representation of plain text
 * @param {Number[][][]} scheduled round key
 * @return {Number[]} unicode representation of cipher text
 */
function encrypt(s, key)
{
	var col = 4;
	var row = nByte / col;
	var res = [];
	var state = [];
	/* transform into state array */
	for (var i = 0; i < row; i++)
	{
		state[i] = [];
		for (var j = 0; j < col; j++)
			state[i][j] = s[j * row + i];
	}
	/* add round key */
	for (var i = 0; i < row; i++)
		for (var j = 0; j < col; j++)
			state[i][j] ^= key[0][i][j];
	for (var i = 0; i < nRound; i++)
	{
		/* substitute */
		for (var j = 0; j < row; j++)
			for (var k = 0; k < col; k++)
				state[j][k] = sBox[state[j][k]];
		/* shift (left) rows */
		for (var j = 0; j < row; j++)
		{
			var tmp = [];
			for (var k = 0; k < col; k++)
				tmp[k] = state[j][k];
			for (var k = 0; k < col; k++)
				state[j][k] = tmp[(k + j) % col];
		}
		var tmp = [];
		for (var j = 0; j < row; j++)
		{
			tmp[j] = [];
			for (var k = 0; k < col; k++)
				tmp[j][k] = state[j][k];
		}
		/* mix columns */
		if (i < nRound - 1)
			for (var j = 0; j < col; j++)
			{
				state[0][j] = multiply(tmp[0][j], 2) ^ multiply(tmp[1][j], 3) ^ tmp[2][j] ^ tmp[3][j];
				state[1][j] = tmp[0][j] ^ multiply(tmp[1][j], 2) ^ multiply(tmp[2][j], 3) ^ tmp[3][j];
				state[2][j] = tmp[0][j] ^ tmp[1][j] ^ multiply(tmp[2][j], 2) ^ multiply(tmp[3][j], 3);
				state[3][j] = multiply(tmp[0][j], 3) ^ tmp[1][j] ^ tmp[2][j] ^ multiply(tmp[3][j], 2);
			}
		/* add round key */
		for (var j = 0; j < row; j++)
			for (var k = 0; k < col; k++)
				state[j][k] ^= key[i + 1][j][k];
	}
	for (var i = 0; i < row; i++)
		for (var j = 0; j < col; j++)
			res[j * row + i] = state[i][j];
	return res;
}
/**
 * @param {Number[]} unicode representation of cipher text
 * @param {Number[][][]} scheduled round key
 * @return {Number[]} unicode representation of plain text
 */
function decrypt(s, key)
{
	var col = 4;
	var row = nByte / col;
	var res = [];
	var state = [];
	/* transform into state array */
	for (var i = 0; i < row; i++)
	{
		state[i] = [];
		for (var j = 0; j < col; j++)
			state[i][j] = s[j * row + i];
	}
	/* add round key */
	for (var i = 0; i < row; i++)
		for (var j = 0; j < col; j++)
			state[i][j] ^= key[nRound][i][j];
	for (var i = nRound; i > 0; i--)
	{
		/* shift (right) rows */
		for (var j = 0; j < row; j++)
		{
			var tmp = [];
			for (var k = 0; k < col; k++)
				tmp[k] = state[j][k];
			for (var k = 0; k < col; k++)
				state[j][k] = tmp[(k - j + col) % col];
		}
		/* inverse substitute */
		for (var j = 0; j < row; j++)
			for (var k = 0; k < col; k++)
				state[j][k] = iBox[state[j][k]];
		/* add round key */
		for (var j = 0; j < row; j++)
			for (var k = 0; k < col; k++)
				state[j][k] ^= key[i - 1][j][k];
		var tmp = [];
		for (var j = 0; j < row; j++)
		{
			tmp[j] = [];
			for (var k = 0; k < col; k++)
				tmp[j][k] = state[j][k];
		}
		/* mix columns */
		if (i > 1)
			for (var j = 0; j < col; j++)
			{
				state[0][j] = multiply(tmp[0][j], 0x0E) ^ multiply(tmp[1][j], 0x0B) ^ multiply(tmp[2][j], 0x0D) ^ multiply(tmp[3][j], 0x09);
				state[1][j] = multiply(tmp[0][j], 0x09) ^ multiply(tmp[1][j], 0x0E) ^ multiply(tmp[2][j], 0x0B) ^ multiply(tmp[3][j], 0x0D);
				state[2][j] = multiply(tmp[0][j], 0x0D) ^ multiply(tmp[1][j], 0x09) ^ multiply(tmp[2][j], 0x0E) ^ multiply(tmp[3][j], 0x0B);
				state[3][j] = multiply(tmp[0][j], 0x0B) ^ multiply(tmp[1][j], 0x0D) ^ multiply(tmp[2][j], 0x09) ^ multiply(tmp[3][j], 0x0E);
			}
	}
	for (var i = 0; i < row; i++)
		for (var j = 0; j < col; j++)
			res[j * row + i] = state[i][j];
	return res;
}