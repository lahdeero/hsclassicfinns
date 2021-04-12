import moment from "moment"
import fs from "fs"

export const writeToFile = (ranks) => {
	fs.appendFile(`./ranks.txt`, msg, function (err, _data) {
	  if (err) {
	    return console.error(err);
	  }
	});
}

