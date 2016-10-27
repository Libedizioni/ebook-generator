#!/bin/bash

# measure script timing
time_start() {
    START=$(date +%s%3N)
}
time_end() {
    END=$(( $(date +%s%3N) - $START ))
}

# conform editing shortcuts to markdown syntax
process_markdown_edits() {
    echo "[+] fixing all docx editing shortcuts in markdown files:"

    # search for .md files
    MD_FILES=$( find "$SRC" -type f -name '*.md' -print )

    for SELECTED in $MD_FILES
        # and convert each to markdown
        do
            echo "[+] now processing " "$SELECTED"
            # process heading attributes
            sed -i 's/\\#/#/g' "$SELECTED"
            # process newlines
            sed -i 's/{.NEWLINE}/\\/g' "$SELECTED"
            # process paragraph align classes
            sed -i '/{.LEFT}/{n;s/.*/<\/p>\n/}' "$SELECTED"
            sed -i '/{.CENTER}/{n;s/.*/<\/p>\n/}' "$SELECTED"
            sed -i '/{.RIGHT}/{n;s/.*/<\/p>\n/}' "$SELECTED"
            sed -i 's/{.LEFT}/<p class="alignleft">\n/g' "$SELECTED"
            sed -i 's/{.CENTER}/<p class="aligncenter">\n/g' "$SELECTED"
            sed -i 's/{.RIGHT}/<p class="alignright">\n/g' "$SELECTED"
    done

}

# report script info and execution time
report() {
    sec_diff=$(($END / 1000))
    ms_hrs=$(printf "%02d" $(($sec_diff / 3600)))
    ms_min=$(printf "%02d" $((($sec_diff / 60) % 60)))
    ms_sec=$(printf "%02d" $(($sec_diff % 60)))
    ms_msec=$(printf "%03d" $(($END % 1000)))
    TOT_TIME="$ms_hrs:$ms_min:$ms_sec:$ms_msec"

    echo "Script $( basename $0 ) execution time: " "$TOT_TIME"
}

# get it done!
time_start
process_markdown_edits
time_end
report
