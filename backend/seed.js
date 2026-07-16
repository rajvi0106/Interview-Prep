import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/question.models.js";

dotenv.config();

const questions = [
  // ---------------- DSA (10) ----------------
  {
    topic: "DSA",
    difficulty: "Easy",
    questionText: "How does a hashmap achieve average O(1) lookup time?",
    modelAns: "A hashmap stores key-value pairs in an underlying array. A hash function converts each key into an integer, which is mapped to an array index (usually via modulo with the array size). To fetch a value, the same hash function is applied to the key, jumping directly to the correct index instead of scanning the whole structure. Collisions (two keys hashing to the same index) are handled via chaining (a linked list per bucket) or open addressing (probing for the next free slot). Average-case lookup is O(1) because a good hash function spreads keys evenly, though worst case degrades to O(n) if many keys collide.",
    keyConcepts: ["hash function", "array indexing", "collision handling", "chaining", "open addressing"]
  },
  {
    topic: "DSA",
    difficulty: "Easy",
    questionText: "What is the difference between an array and a linked list, and when would you choose one over the other?",
    modelAns: "An array stores elements in contiguous memory, giving O(1) index-based access but O(n) insertion/deletion in the middle since elements must shift. A linked list stores elements as nodes connected by pointers, giving O(1) insertion/deletion once you have a reference to the node, but O(n) access since you must traverse from the head. Choose arrays when you need fast random access and know the size roughly in advance. Choose linked lists when you're doing frequent insertions/deletions, especially at the front, and don't need random access.",
    keyConcepts: ["contiguous memory", "pointers", "time complexity", "random access", "insertion cost"]
  },
  {
    topic: "DSA",
    difficulty: "Medium",
    questionText: "Explain how binary search works and why it requires a sorted array.",
    modelAns: "Binary search repeatedly halves the search space by comparing the target to the middle element. If the target is smaller, it discards the right half; if larger, it discards the left half; this repeats until the target is found or the space is empty, giving O(log n) time. It requires a sorted array because the entire algorithm relies on being able to infer which half the target lies in based on a single comparison — in an unsorted array, discarding half the elements could discard the target itself.",
    keyConcepts: ["divide and conquer", "logarithmic time", "sorted precondition", "search space reduction"]
  },
  {
    topic: "DSA",
    difficulty: "Medium",
    questionText: "What is the difference between BFS and DFS, and when would you use each?",
    modelAns: "BFS (breadth-first search) explores a graph level by level using a queue, visiting all neighbors of a node before moving deeper. DFS (depth-first search) explores as far as possible down one path using a stack (or recursion) before backtracking. BFS is ideal for finding the shortest path in an unweighted graph, since it explores nodes in increasing distance order. DFS is better suited for tasks like detecting cycles, topological sorting, or exploring all possible paths, since it naturally goes deep before wide.",
    keyConcepts: ["queue", "stack", "shortest path", "graph traversal", "recursion"]
  },
  {
    topic: "DSA",
    difficulty: "Medium",
    questionText: "How would you detect a cycle in a linked list?",
    modelAns: "The standard approach is Floyd's Cycle Detection (the 'tortoise and hare' algorithm). Two pointers traverse the list — a slow pointer moving one node at a time, and a fast pointer moving two nodes at a time. If the list has a cycle, the fast pointer will eventually lap the slow pointer and they'll meet at the same node. If the fast pointer reaches the end (null), there's no cycle. This runs in O(n) time and O(1) space, which is better than the alternative of storing visited nodes in a hash set (also O(n) time but O(n) space).",
    keyConcepts: ["Floyd's algorithm", "two pointers", "space complexity", "linked list traversal"]
  },
  {
    topic: "DSA",
    difficulty: "Medium",
    questionText: "Explain the difference between dynamic programming and plain recursion, using a concrete example.",
    modelAns: "Plain recursion breaks a problem into subproblems and solves them independently, which often means recomputing the same subproblem many times — for example, naive Fibonacci recursion recalculates fib(2) repeatedly across different branches, leading to exponential time. Dynamic programming avoids this by storing the result of each subproblem the first time it's solved (memoization, top-down) or building up solutions iteratively from the smallest subproblems (tabulation, bottom-up), so each subproblem is solved once. For Fibonacci, this brings the time complexity down from exponential to linear.",
    keyConcepts: ["memoization", "tabulation", "overlapping subproblems", "time complexity reduction"]
  },
  {
    topic: "DSA",
    difficulty: "Hard",
    questionText: "How does quicksort work, and what causes its worst-case time complexity?",
    modelAns: "Quicksort picks a pivot element, partitions the array so elements smaller than the pivot go left and larger go right, then recursively sorts both halves. On average this gives O(n log n) time because each partition step roughly halves the problem. The worst case, O(n²), happens when the pivot chosen is consistently the smallest or largest element in the array — for example, always picking the first element as pivot on an already-sorted array causes each partition to only remove one element instead of halving the array, degenerating into effectively a nested loop. Randomizing pivot selection or using median-of-three helps avoid this.",
    keyConcepts: ["partitioning", "pivot selection", "average vs worst case", "randomization"]
  },
  {
    topic: "DSA",
    difficulty: "Hard",
    questionText: "What is a trie, and what problem does it solve better than a hashmap?",
    modelAns: "A trie (prefix tree) is a tree structure where each node represents a character, and paths from the root spell out words or prefixes stored in the structure. Unlike a hashmap, which can only tell you if an exact key exists, a trie efficiently supports prefix-based queries — such as autocomplete or checking if any word starts with a given prefix — in time proportional to the length of the prefix, not the number of stored words. This makes tries ideal for dictionary lookups, autocomplete systems, and spell checkers, where hashmaps would require scanning every key to find prefix matches.",
    keyConcepts: ["prefix tree", "autocomplete", "time complexity by string length", "hashmap limitations"]
  },
  {
    topic: "DSA",
    difficulty: "Hard",
    questionText: "Explain how a min-heap works and why it gives O(log n) insertion and removal.",
    modelAns: "A min-heap is a complete binary tree where every parent node is smaller than or equal to its children, meaning the smallest element is always at the root. It's typically stored as an array, with a node at index i having children at 2i+1 and 2i+2. Insertion adds the new element at the end of the array, then 'bubbles up' by swapping with its parent until the heap property is restored — since tree height is log n, this takes O(log n). Removal (of the minimum) replaces the root with the last element, then 'bubbles down' by swapping with the smaller child until the heap property holds again, also O(log n) due to tree height.",
    keyConcepts: ["complete binary tree", "heap property", "bubble up", "bubble down", "array representation"]
  },
  {
    topic: "DSA",
    difficulty: "Hard",
    questionText: "What is the difference between time complexity and space complexity, and can you give an example where you'd trade one for the other?",
    modelAns: "Time complexity measures how the runtime of an algorithm grows with input size, while space complexity measures how the memory usage grows with input size. They're often in tension: memoization in dynamic programming trades increased space (storing every subproblem's result) for reduced time (avoiding recomputation) — turning an exponential-time recursive solution into a linear-time one at the cost of linear extra space. Conversely, an in-place sorting algorithm like heapsort sacrifices some conceptual simplicity to achieve O(1) extra space instead of the O(n) space used by mergesort.",
    keyConcepts: ["time-space tradeoff", "memoization cost", "in-place algorithms", "asymptotic analysis"]
  },

  // ---------------- HR (10) ----------------
  {
    topic: "HR",
    difficulty: "Easy",
    questionText: "Tell me about yourself.",
    modelAns: "A strong answer follows a brief present-past-future structure: start with your current role or field of study, mention 1-2 relevant past experiences or projects that shaped your skills, then connect it to why you're interested in this specific role or company. Keep it under 90 seconds, focus on professional relevance rather than personal history, and end on something that naturally leads into the interviewer's next question.",
    keyConcepts: ["present-past-future structure", "conciseness", "relevance to role", "professional framing"]
  },
  {
    topic: "HR",
    difficulty: "Easy",
    questionText: "Why do you want to work here?",
    modelAns: "A good answer connects specific, researched details about the company (its product, mission, recent work, or engineering culture) to your own skills and career goals — showing you've done real research rather than giving a generic answer that could apply to any company. Avoid answers focused only on what the company can give you (salary, brand name); instead frame it as a mutual fit, showing what you bring and why this specific company is where you want to bring it.",
    keyConcepts: ["company research", "mutual fit framing", "specificity", "avoiding generic answers"]
  },
  {
    topic: "HR",
    difficulty: "Medium",
    questionText: "Tell me about a time you disagreed with a teammate. How did you handle it?",
    modelAns: "Use the STAR method: describe the Situation and Task briefly, then focus most of your answer on the Action — specifically how you raised the disagreement respectfully, listened to their reasoning, and worked toward a resolution (compromise, escalation, or data-driven decision). End with the Result, ideally showing the outcome improved the project or the working relationship. Avoid answers that paint the teammate negatively or make you sound uncompromising — interviewers are testing collaboration skills, not who was 'right.'",
    keyConcepts: ["STAR method", "conflict resolution", "collaboration", "avoiding blame framing"]
  },
  {
    topic: "HR",
    difficulty: "Medium",
    questionText: "Describe a time you failed at something. What did you learn?",
    modelAns: "Pick a real, moderately significant failure — not a fake humblebrag ('I work too hard') and not something catastrophic that raises red flags. Briefly explain what happened and your role in it, take clear ownership rather than blaming external factors, then spend most of the answer on what you changed afterward — a new habit, process, or mindset — and ideally give a brief example of applying that lesson successfully since then.",
    keyConcepts: ["ownership", "genuine vulnerability", "learning and change", "avoiding humblebrags"]
  },
  {
    topic: "HR",
    difficulty: "Medium",
    questionText: "How do you handle working under tight deadlines or pressure?",
    modelAns: "Strong answers describe a concrete system rather than vague reassurance — for example, breaking work into prioritized tasks, communicating early with stakeholders if a deadline is at risk, and focusing on the highest-impact work first if time runs short. Back it up with a specific past example where this approach worked, rather than only describing your philosophy in the abstract.",
    keyConcepts: ["prioritization", "proactive communication", "concrete example", "specificity over abstraction"]
  },
  {
    topic: "HR",
    difficulty: "Medium",
    questionText: "Where do you see yourself in 5 years?",
    modelAns: "The goal is to show ambition that's realistic and aligned with the role you're interviewing for — not an unrelated dream job, and not something so vague it sounds unconsidered. A good answer mentions growing in depth of technical or leadership skill relevant to this career path, ideally referencing the kind of growth this specific company or role could offer, without overpromising loyalty or sounding like you've mapped out every detail.",
    keyConcepts: ["career alignment", "realistic ambition", "role relevance", "avoiding vagueness"]
  },
  {
    topic: "HR",
    difficulty: "Hard",
    questionText: "Tell me about a time you had to give difficult feedback to someone.",
    modelAns: "Use STAR, but focus specifically on how you delivered the feedback — was it private, specific, and focused on behavior rather than personality? Mention how you balanced honesty with empathy, and how you followed up afterward to see if the feedback landed and led to change. This question tests emotional intelligence and directness at the same time, so avoid both extremes: an answer that's overly harsh, or one so soft it implies you avoid confrontation entirely.",
    keyConcepts: ["behavior-focused feedback", "emotional intelligence", "follow-up", "balancing honesty and empathy"]
  },
  {
    topic: "HR",
    difficulty: "Hard",
    questionText: "Why should we hire you over other candidates?",
    modelAns: "Avoid generic claims like 'I work hard' or 'I'm a fast learner' without evidence. Instead, identify 2-3 specific things from the job description that map directly to concrete experience or skills you have, and briefly justify each with a real example. The strongest version of this answer shows you understand what the role actually needs, not just that you want it.",
    keyConcepts: ["job description mapping", "evidence-based claims", "specificity", "avoiding generic self-praise"]
  },
  {
    topic: "HR",
    difficulty: "Hard",
    questionText: "Describe a situation where you had to make a decision without complete information.",
    modelAns: "A strong answer shows a structured decision-making process under uncertainty: gathering whatever information was available, identifying the biggest risks of being wrong, consulting relevant people if time allowed, and making a reasoned call rather than freezing or guessing randomly. Mention the outcome honestly — if it wasn't perfect, explain what you'd do differently, since interviewers are testing judgment and self-awareness more than a guaranteed successful outcome.",
    keyConcepts: ["decision-making under uncertainty", "risk assessment", "judgment", "self-awareness in outcome"]
  },
  {
    topic: "HR",
    difficulty: "Hard",
    questionText: "How do you prioritize when you have multiple competing deadlines from different stakeholders?",
    modelAns: "A strong answer describes a clear prioritization framework — such as assessing urgency versus impact, clarifying priorities directly with stakeholders rather than assuming, and communicating early if something will slip rather than silently missing a deadline. Mentioning a specific past example where competing priorities were successfully navigated, including how you communicated trade-offs to stakeholders, makes the answer concrete rather than theoretical.",
    keyConcepts: ["urgency vs impact", "stakeholder communication", "transparency on trade-offs", "concrete example"]
  },

  // ---------------- System Design (10) ----------------
  {
    topic: "System Design",
    difficulty: "Easy",
    questionText: "What is a load balancer and why is it needed?",
    modelAns: "A load balancer sits between clients and a group of backend servers, distributing incoming requests across those servers so no single server gets overwhelmed. It's needed because a single server has a limited capacity for handling concurrent requests — without a load balancer, that server becomes a bottleneck and single point of failure. Load balancers also enable horizontal scaling (adding more servers as traffic grows) and can reroute traffic away from a server that goes down, improving availability.",
    keyConcepts: ["traffic distribution", "horizontal scaling", "single point of failure", "availability"]
  },
  {
    topic: "System Design",
    difficulty: "Easy",
    questionText: "What is the difference between vertical and horizontal scaling?",
    modelAns: "Vertical scaling means adding more resources (CPU, RAM) to a single existing server — it's simpler to implement but has a hard ceiling, since a single machine can only get so powerful, and it creates a single point of failure. Horizontal scaling means adding more servers and distributing load across them — it scales further and improves fault tolerance, but adds complexity, since you now need mechanisms like load balancing and data synchronization across machines.",
    keyConcepts: ["scaling up vs out", "single point of failure", "fault tolerance", "complexity tradeoff"]
  },
  {
    topic: "System Design",
    difficulty: "Medium",
    questionText: "What is caching, and what are the risks of using it?",
    modelAns: "Caching stores frequently accessed data in a fast-access layer (like in-memory storage) so future requests for the same data can be served quickly instead of recomputing or re-fetching from a slower source like a database. The main risk is cache invalidation — if the underlying data changes but the cache isn't updated, users can see stale data. Other risks include cache stampede (many requests hitting the database simultaneously when a popular cache entry expires) and added system complexity from having to keep the cache and source of truth in sync.",
    keyConcepts: ["cache invalidation", "stale data", "cache stampede", "read performance"]
  },
  {
    topic: "System Design",
    difficulty: "Medium",
    questionText: "Explain the difference between SQL and NoSQL databases, and when you'd choose each.",
    modelAns: "SQL databases (like PostgreSQL) use structured tables with fixed schemas and support complex relational queries via joins, with strong consistency guarantees (ACID). NoSQL databases (like MongoDB) use flexible, often schema-less document or key-value structures, prioritizing scalability and flexibility over strict relational integrity. Choose SQL when data is highly relational and consistency is critical, like financial transactions. Choose NoSQL when the schema will evolve frequently, data is less relational, or you need to scale horizontally across many servers with high write throughput, like storing user activity logs.",
    keyConcepts: ["ACID properties", "schema flexibility", "relational queries", "horizontal scalability"]
  },
  {
    topic: "System Design",
    difficulty: "Medium",
    questionText: "What is database sharding, and what problems does it introduce?",
    modelAns: "Sharding splits a large database into smaller, independent pieces (shards), each holding a subset of the data — usually partitioned by a key like user ID — spread across multiple servers. This allows a system to scale beyond what a single database server can handle. It introduces complexity: queries that need data from multiple shards become harder (no more simple joins across shard boundaries), rebalancing shards as data grows unevenly is difficult, and maintaining consistency across shards requires extra care compared to a single database instance.",
    keyConcepts: ["horizontal partitioning", "shard key", "cross-shard queries", "rebalancing"]
  },
  {
    topic: "System Design",
    difficulty: "Medium",
    questionText: "What is the CAP theorem, and why can't a distributed system have all three properties simultaneously?",
    modelAns: "CAP theorem states a distributed system can only guarantee two of three properties at once: Consistency (every read gets the latest write), Availability (every request gets a response, even if not the latest data), and Partition tolerance (the system keeps working despite network failures between nodes). Since network partitions are unavoidable in real distributed systems, the practical choice is between consistency and availability during a partition — you can't guarantee both, because giving an immediate response might return stale data (sacrificing consistency), while waiting for the latest data might mean not responding at all (sacrificing availability).",
    keyConcepts: ["consistency", "availability", "partition tolerance", "distributed systems tradeoffs"]
  },
  {
    topic: "System Design",
    difficulty: "Hard",
    questionText: "How would you design a URL shortener like bit.ly at a high level?",
    modelAns: "Core components: an API to accept a long URL and return a short code, a database mapping short codes to original URLs, and a redirect service that looks up the code and issues an HTTP redirect. The short code can be generated via a counter converted to base62, or a hash of the URL truncated and checked for collisions. For scale, add caching (since reads/redirects vastly outnumber writes), and consider read replicas of the database since redirects are read-heavy. Analytics (click counts) can be tracked asynchronously via a message queue to avoid slowing down the redirect path itself.",
    keyConcepts: ["base62 encoding", "read-heavy system", "caching for reads", "asynchronous analytics"]
  },
  {
    topic: "System Design",
    difficulty: "Hard",
    questionText: "What is the difference between a message queue and a pub/sub system, and when would you use each?",
    modelAns: "A message queue (like a task queue) typically delivers each message to exactly one consumer, making it ideal for distributing work across worker processes — like processing background jobs. A pub/sub system delivers each message to every subscriber interested in that topic, making it ideal for broadcasting events to multiple independent services — like notifying both an email service and an analytics service when a user signs up. Choose a queue when you want work divided among consumers; choose pub/sub when multiple systems each need their own copy of the same event.",
    keyConcepts: ["work distribution", "event broadcasting", "consumer patterns", "decoupled services"]
  },
  {
    topic: "System Design",
    difficulty: "Hard",
    questionText: "How would you design a rate limiter for an API?",
    modelAns: "A common approach is the token bucket algorithm: each user has a bucket that refills with tokens at a fixed rate, and each request consumes one token — if the bucket is empty, the request is rejected or delayed. This allows brief bursts of traffic while still enforcing an average rate limit. For a distributed system with multiple API servers, the token counts need to live in a shared, fast store like Redis rather than in each server's local memory, so limits are enforced consistently regardless of which server handles a given request.",
    keyConcepts: ["token bucket algorithm", "burst handling", "distributed state", "shared store for consistency"]
  },
  {
    topic: "System Design",
    difficulty: "Hard",
    questionText: "What are the tradeoffs between strong consistency and eventual consistency in a distributed database?",
    modelAns: "Strong consistency guarantees that once a write completes, every subsequent read (from any node) sees that write immediately — this is easier to reason about but typically requires more coordination between nodes, increasing latency and reducing availability during network issues. Eventual consistency allows reads to briefly return stale data after a write, with all nodes converging to the same state over time — this improves availability and latency, but requires the application to tolerate temporary inconsistency, which isn't acceptable for something like a bank balance but is fine for something like a social media like-count.",
    keyConcepts: ["strong consistency", "eventual consistency", "coordination overhead", "use-case dependent tolerance"]
  },

  // ---------------- CS Fundamentals (10) ----------------
  {
    topic: "CS Fundamentals",
    difficulty: "Easy",
    questionText: "What is the difference between a process and a thread?",
    modelAns: "A process is an independent program in execution with its own dedicated memory space, meaning processes don't share memory directly and communication between them requires explicit mechanisms like pipes or sockets. A thread is a smaller unit of execution within a process, and multiple threads within the same process share that process's memory space, making communication between threads easier but also introducing risks like race conditions if not properly synchronized.",
    keyConcepts: ["memory isolation", "shared memory", "inter-process communication", "race conditions"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Easy",
    questionText: "What is the difference between TCP and UDP?",
    modelAns: "TCP is connection-oriented and guarantees reliable, ordered delivery of data by establishing a handshake, acknowledging received packets, and retransmitting lost ones — this makes it suited for things like file transfers or web pages where data integrity matters. UDP is connectionless and doesn't guarantee delivery or order, but has lower overhead and latency, making it suited for real-time applications like video calls or gaming, where a dropped packet is less costly than the delay of retransmission.",
    keyConcepts: ["connection-oriented", "reliability", "ordering guarantees", "latency tradeoff"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Medium",
    questionText: "What is database normalization, and why is it useful?",
    modelAns: "Normalization is the process of organizing a database schema to reduce data redundancy and avoid update anomalies, typically by splitting data into multiple related tables instead of storing repeated information in one large table. For example, instead of storing a customer's address in every order row, you'd store it once in a customers table and reference it via a foreign key. This is useful because it prevents inconsistencies (updating an address in one place instead of many) and reduces storage waste, though heavily normalized schemas can require more joins, which can affect read performance.",
    keyConcepts: ["data redundancy", "update anomalies", "foreign keys", "normalization vs read performance"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Medium",
    questionText: "What is a deadlock, and what conditions must be present for one to occur?",
    modelAns: "A deadlock occurs when two or more processes are each waiting for a resource held by the other, so none of them can proceed. Four conditions must all hold for a deadlock to occur: mutual exclusion (resources can't be shared), hold and wait (a process holds a resource while waiting for another), no preemption (resources can't be forcibly taken away), and circular wait (a cycle of processes each waiting on the next). Preventing deadlocks generally means breaking at least one of these conditions, such as enforcing a strict order in which resources must be requested.",
    keyConcepts: ["mutual exclusion", "hold and wait", "no preemption", "circular wait"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Medium",
    questionText: "What is the difference between an abstract class and an interface in object-oriented programming?",
    modelAns: "An abstract class can provide both fully implemented methods and abstract (unimplemented) ones, and a class can only inherit from one abstract class, since most languages don't support multiple inheritance of classes. An interface typically only defines method signatures (a contract) without implementation, and a class can implement multiple interfaces. Use an abstract class when you want to share common code across related classes; use an interface when you want unrelated classes to guarantee they support certain behavior, regardless of their inheritance hierarchy.",
    keyConcepts: ["single inheritance", "multiple interface implementation", "code sharing", "contract-based design"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Medium",
    questionText: "What is indexing in a database, and what's the tradeoff of adding an index?",
    modelAns: "An index is a data structure (often a B-tree) built on one or more columns of a table that lets the database find matching rows much faster than scanning every row, similar to how a book's index lets you jump to a page instead of reading the whole book. The tradeoff is that indexes speed up reads but slow down writes, since every insert, update, or delete must also update the index — and indexes consume additional storage. This means you should index columns that are frequently searched or joined on, but avoid over-indexing tables that are write-heavy.",
    keyConcepts: ["B-tree", "read vs write tradeoff", "storage cost", "selective indexing"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Hard",
    questionText: "Explain the difference between processes' virtual memory and physical memory, and why virtual memory is used.",
    modelAns: "Physical memory is the actual RAM hardware installed on a machine. Virtual memory is an abstraction the operating system provides to each process, giving it the illusion of a large, contiguous address space, even though the underlying physical memory may be fragmented or smaller than what's addressed. The OS maps virtual addresses to physical ones via page tables, swapping data to disk when physical memory is full. Virtual memory is used because it isolates processes from each other (a process can't accidentally access another's memory), simplifies programming (developers don't need to manage physical memory placement), and allows running programs larger than available physical RAM.",
    keyConcepts: ["address space abstraction", "page tables", "process isolation", "memory swapping"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Hard",
    questionText: "What happens, step by step, when you type a URL into a browser and hit enter?",
    modelAns: "The browser first checks its cache for a DNS resolution, or queries a DNS server to resolve the domain into an IP address. It then establishes a TCP connection to that IP (including a TLS handshake if HTTPS), and sends an HTTP request. The server processes the request, possibly querying a database or backend service, and returns an HTTP response. The browser then parses the returned HTML, and as it encounters CSS and JavaScript references, makes additional requests for them, builds the DOM and CSSOM, and renders the final page, executing any JavaScript along the way.",
    keyConcepts: ["DNS resolution", "TCP handshake", "TLS handshake", "DOM rendering"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Hard",
    questionText: "What is the difference between optimistic and pessimistic locking in database concurrency control?",
    modelAns: "Pessimistic locking assumes conflicts are likely, so it locks a resource as soon as a transaction starts working with it, preventing other transactions from modifying it until the lock is released — this avoids conflicts but can hurt performance due to transactions waiting on each other. Optimistic locking assumes conflicts are rare, so it lets transactions proceed without locking, but checks (typically via a version number or timestamp) at commit time whether the data was modified by someone else in the meantime — if so, the transaction is rejected and must retry. Optimistic locking performs better under low contention; pessimistic locking is safer under high contention where conflicts are frequent.",
    keyConcepts: ["lock contention", "version checking", "transaction rollback", "concurrency performance"]
  },
  {
    topic: "CS Fundamentals",
    difficulty: "Hard",
    questionText: "What is the difference between symmetric and asymmetric encryption, and where is each typically used?",
    modelAns: "Symmetric encryption uses the same key to encrypt and decrypt data, making it fast and efficient for large amounts of data, but requiring a secure way to share that key between parties beforehand. Asymmetric encryption uses a public-private key pair — data encrypted with the public key can only be decrypted with the private key — which solves the key-sharing problem but is computationally slower. In practice, systems like HTTPS use both together: asymmetric encryption is used during the initial handshake to securely exchange a symmetric key, which is then used for the actual data transfer since it's much faster.",
    keyConcepts: ["public-private key pair", "key exchange problem", "computational cost", "hybrid encryption in TLS"]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Question.insertMany(questions);
    console.log(`Seeded ${questions.length} questions successfully`);

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();