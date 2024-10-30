

function Candidates({jobId}:any) {
  return (
   // כאן תוכל להוסיף את הלוגיקה שלך להצגת המועמדים
        <div className="mt-5">
            <h4 className="text-lg font-semibold">Candidates List</h4>
            {/* הצג את המועמדים כאן */}
            <p>jobid={jobId}</p>
        </div>
    );
  
}

export default Candidates
