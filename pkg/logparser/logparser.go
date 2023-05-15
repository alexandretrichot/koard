package logparser

import (
	"regexp"
)

type LogLine struct {
	Message string
	Tags    map[string]string
}

/* func ParseLogLine(line string) (LogLine, error) {
	re := regexp.MustCompile(`^(\w{1})\d{4}\s\d{2}:\d{2}:\d{2}\.\d{6}\s\d+\s[\w\-\.]+(:\d+)?\]([^\"]+)?(\"[\w\-]+"="[^"]+")*`)
	matches := re.FindStringSubmatch(line)

	if len(matches) == 0 {
		return LogLine{}, errors.New("invalid log line format")
	}

	var message string
	tags := make(map[string]string)

	// Extract message
	message = matches[3]

	// Extract tags
	tagRe := regexp.MustCompile(`"([\w\-]+)"="([^"]+)"`)
	tagMatches := tagRe.FindAllStringSubmatch(line, -1)

	for _, match := range tagMatches {
		tags[match[1]] = match[2]
	}

	return LogLine{Message: message, Tags: tags}, nil
}
*/

func ParseLogLine(line string) (LogLine, error) {
	tags := make(map[string]string)

	// Extract tags
	tagRe := regexp.MustCompile(`"([\w\-]+)"="?([^"]+)"?`)
	tagMatches := tagRe.FindAllStringSubmatch(line, -1)

	for _, match := range tagMatches {
		tags[match[1]] = match[2]
	}

	// Extract message from the "message" or "msg" tag, or use the entire line as a fallback
	var message string
	var ok bool

	if message, ok = tags["message"]; ok {
		delete(tags, "message")
	} else if message, ok = tags["msg"]; ok {
		delete(tags, "msg")
	} else {
		// Extract message without tags
		messageRe := regexp.MustCompile(`^(?:\w{1}\d{4}\s\d{2}:\d{2}:\d{2}\.\d{6}\s\d+\s[\w\-\.]+(:\d+)?\])\s+(.+)$`)
		messageMatches := messageRe.FindStringSubmatch(line)

		if len(messageMatches) > 0 {
			message = messageMatches[2]
		} else {
			message = line
		}
	}

	return LogLine{Message: message, Tags: tags}, nil
}
