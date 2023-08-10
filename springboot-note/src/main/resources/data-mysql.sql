INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (1, '230. Kth Smallest Element in a BST', 'guest', '<p><u>https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/</u></p><p><u>https://labuladong.github.io/algo/2/21/42/</u></p><pre><code class="language-java">class Solution {
    int res = 0;
    int rank = 0;
    public int kthSmallest(TreeNode root, int k) {
        traverse(root, k);
        return res;
    }

    void traverse(TreeNode root, int k) {
        if (root == null) return;
        traverse(root.left, k);
        //inorder traverse
        rank++;
        if (rank == k) {
            res = root.val;
            return;
        }
        traverse(root.right, k);
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (2, '733. Flood Fill', 'guest', '<p>https://leetcode.com/problems/flood-fill/description/</p><p>https://mp.weixin.qq.com/s/Y7snQIraCC6PRhj9ZSnlzw</p><p><span style="color: rgb(51, 51, 51)">DFS：https://leetcode.cn/problems/flood-fill/solutions/375836/tu-xiang-xuan-ran-by-leetcode-solution/comments/547633</span></p><p><u>If the original color and the newly dyed color are the same, terminated recursion.</u></p><pre><code class="language-java">class Solution {
    int[] dx = {-1, 1, 0, 0};
    int[] dy = {0, 0, -1, 1};
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int currColor = image[sr][sc];
        fill(image, sr, sc, currColor, color);
        return image;
    }

    void fill(int[][] image, int x, int y, int origColor, int color) {
        if (!inArea(image, x, y)) return;
        if (origColor == color) return; //jump out
        if (image[x][y] != origColor) return; //not the target color

        image[x][y] = color; //flood the color
        for (int i = 0; i &lt; 4; i++) {
            int mx = x + dx[i], my = y + dy[i]; //important
            fill(image, mx, my, origColor, color);
        }
    }

    boolean inArea(int[][] image, int x, int y) {
        return x &gt;= 0 &amp;&amp; x &lt; image.length
            &amp;&amp; y &gt;= 0 &amp;&amp; y &lt; image[0].length;
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (3, 'Data Science Notes', 'guest', '<p><span>05 - Introduction to Data Science</span></p><p><span>Volume, Velocity, Variety, Veracity</span></p><p><span>&nbsp;</span></p><p><strong><span style="color: rgb(120, 120, 120)">What is Data Science?</span></strong></p><p><span>• </span><span style="color: rgb(155, 8, 5)">Data Science</span><span>: Involves principles, processes, and methods for identifying and understanding phenomena via the automated or semi-automated analysis of data.</span></p><p><span>• </span><span style="color: rgb(155, 8, 5)">Data Mining</span><span>: Extraction of knowledge from data, using algorithms that incorporate these principles.</span></p><p><span>&nbsp;</span></p><p><span>Examples of common data science tasks:</span></p><p><span>- Prediction: Identify customers likely to move to a competitor</span></p><p><span>- Regression: Forecast revenue based on historic data - Clustering: Segment customer base into meaningful groups</span></p><p><span>- Anomaly Detection: Identify fraudulent customer behaviour</span></p><p><span>- Visualisation: Support and explain the above tasks</span></p><p><span>&nbsp;</span></p><p><span>Knowledge Discovery in Databases (KDD):</span></p><p><span>Selection</span></p><p><span>Preprocessing</span></p><p><span>Transformation</span></p><p><span>Interpretation</span></p><p><span>Data Mining &amp; Evaluation</span></p><p><span>&nbsp;</span></p><p><strong><span>Data Preparation, Modeling, and Evaluation.</span></strong></p><p><strong><span>&nbsp;</span></strong></p><p><span>• Three basic practical considerations are important </span><strong><span>when designing features</span></strong><span>:</span></p><p><span>1. </span><span style="color: rgb(155, 8, 5)">Data availability</span>: Do we have access to the data required to create the feature?</p><p><span>2. </span><span style="color: rgb(155, 8, 5)">Timing</span>: When will the data required for the feature be available?</p><p><span>3. </span><span style="color: rgb(155, 8, 5)">Longevity</span>: How long will the data used in a feature stay</p><p><span>&nbsp;</span></p><p><span>In CRISP-DM, the basic structure used to represent datasets is the </span><strong><span style="color: rgb(155, 8, 5)">analytics base table </span>(ABT).</strong> Each row represents a case, and is composed of a set of <span style="color: rgb(155, 8, 5)">descriptive features </span>and a <span style="color: rgb(155, 8, 5)">target feature</span></p><p><strong><span>Two further considerations</span></strong><span> have become increasingly important:</span></p><p><span>1.&nbsp;&nbsp;&nbsp;&nbsp; What is </span><strong><span>the financial cost</span></strong><span> of producing data for new features? (</span><span style="color: rgb(155, 8, 5)">Cost-sensitive features</span>)</p><p><span>Example: In clinical, pharmaceutical or manufacturing applications, acquiring new data may require considerable time and resources to set up and run experiments.</span></p><p><span>2.&nbsp;&nbsp;&nbsp;&nbsp; What are the </span><strong><span>privacy or ethical considerat</span></strong><span>ions? (</span><span style="color: rgb(155, 8, 5)">Privacy-sensitive features</span>)</p><p><span>Example: In certain settings, gender information cannot be used in insurance pricing models.</span></p><p><span>&nbsp;</span></p><p><span>Categorical features take a discrete set of possible values, typically represented as strings. Not suitable for algorithm input.</span></p><p><span>&nbsp;• </span><span style="color: rgb(155, 8, 5)">One hot encoding</span>: process by which categorical variables are converted into a numeric form that can be passed to an algorithm.</p>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (4, '48. Rotate Image', 'guest', '<pre><code>class Solution {
    public void rotate(int[][] matrix) {
        transpose(matrix);
        reflect(matrix);
    }


    //reverse the matrix around the main diagonal
    public void transpose(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i &lt; n; i++) {
            for (int j = i + 1; j &lt; n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
    }

    //reverse each row from left to right
    public void reflect(int[][] matrix) {
        for (int[] row : matrix) {
            int i = 0, j = row.length - 1;
            while (j &gt; i) {
                int temp = row[i];
                row[i] = row[j];
                row[j] = temp;
                i++;
                j--;
            }
        }
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (5, '20. Valid Parentheses', 'guest', '<p><span style="color: rgb(51, 51, 51)">如果字符串为单数则false 注意 </span><code>if (!stack.isEmpty() &amp;&amp; stack.peek() == leftOf(symbols[i]))</code><span style="color: rgb(51, 51, 51)"> 左括号时入栈, 右括号时检测栈顶是否符合, 不符合则false</span></p><pre><code class="language-java">class Solution {
    public boolean isValid(String s) {
        Deque&lt;Character&gt; stack = new ArrayDeque&lt;&gt;();
        char[] symbols = s.toCharArray();
        if (symbols.length % 2 != 0) return false;

        for (int i = 0; i &lt; symbols.length; i++) {
            if (symbols[i] == ''('' || symbols[i] == ''[''
                || symbols[i] == ''{'') {
                stack.push(symbols[i]);
            }
            else {
                if (!stack.isEmpty() &amp;&amp; stack.peek() == leftOf(symbols[i])) {
                    stack.pop();
                }
                else {
                    return false;
                }

            }

        }
        return stack.isEmpty();
    }

    char leftOf (char c) {
        if (c == '')'') return ''('';
        if (c == '']'') return ''['';
        return ''{'';
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (6, ' Daily Temperature 每日温度', 'guest', '<p><em><u>https://leetcode.com/problems/daily-temperatures/</u></em></p><p><u>https://labuladong.github.io/algo/2/23/63/</u></p><p><span style="color: rgb(51, 51, 51)"><u>本道题出入栈的元素为数组的索引</u></span></p><p></p><pre><code class="language-java">class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int length = temperatures.length;
        int res[] = new int[length];
        Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;();
        for (int i = length - 1; i &gt;=0; i--) {
            int temp = temperatures[i];
            //compare the temps in the stack
            while(!stack.isEmpty() &amp;&amp; temp &gt;= temperatures[stack.peek()]) {
                stack.pop();
            }
            res[i] = stack.isEmpty()? 0 : (stack.peek() - i);
            stack.push(i);
        }
        return res;
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (7, ' 682. Baseball Game', 'guest', '<p>https://leetcode.com/problems/baseball-game/description/</p><pre><code class="language-java">class Solution {
    public int calPoints(String[] operations) {
        List&lt;Integer&gt; record = new ArrayList&lt;&gt;();
        for (String operation : operations) {
            if (operation.equals("+")) {
                int a = record.get(record.size() - 1);
                int b = record.get(record.size() - 2);
                record.add(a + b);
            }
            else if (operation.equals("D")) {
                int i = record.get(record.size() - 1);
                record.add(i * 2);
            }
            else if (operation.equals("C")) {
                record.remove(record.size() - 1);
            }
            else {
                record.add(Integer.parseInt(operation));
            }
        }
        int sum = 0;
        for (int i : record) sum = sum + i;
        return sum;
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (8, '933. Number of Recent Calls', 'guest', '<p>https://leetcode.com/problems/number-of-recent-calls/</p><p>题意是每次调用ping(t)时在时间t时增加一次call, 然后返回[t - 3000, t]范围内的调用ping的次数.</p><pre><code class="language-java">class RecentCounter {
    public ArrayList&lt;Integer&gt; requests;
    public RecentCounter() {
        requests = new ArrayList&lt;&gt;();
    }

    public int ping(int t) {
        if (requests.size() &gt; 0) {
            if (t - requests.get(requests.size() - 1) &gt; 3000) {
                requests.clear();//因为队列数组值是递增的
            }
        }
        requests.add(t);
        int res = 0;
        for (int i : requests) {
            if (t - i &lt;= 3000) {
                res++;
            }
        }
        return res;
    }
}
</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (9, '21. Merge Two Sorted Lists', 'guest', '<p>https://leetcode.com/problems/merge-two-sorted-lists/</p><p>合并链表</p><ul><li><p>Node number [0, 50]</p></li><li><p><code>-100 &lt;= Node.val &lt;= 100</code></p></li><li><p>Both <code>list1</code> and <code>list2</code> <strong>non-decreasing</strong></p></li></ul><p><strong>代码中用到一个链表的算法题中是很常见的「虚拟头结点」技巧，也就是 </strong><code>dummy</code> 节点。你可以试试，如果不使用 <code>dummy</code> 虚拟节点，代码会复杂很多，而有了 <code>dummy</code> 节点这个占位符，可以避免处理空指针的情况，降低代码的复杂性。</p><pre><code class="language-java">/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1), p = dummy;
        ListNode p1 = list1, p2 = list2;

        while (p1 != null &amp;&amp; p2 != null) {
            if (p1.val &lt; p2.val) {
                p.next = p1;
                p1 = p1.next;
            }
            else {
                p.next = p2;
                p2 = p2.next;
            }
            p = p.next;
        }
        if (p1 != null) {
            p.next = p1;
        }
        if (p2 != null) {
            p.next = p2;
        }

        return dummy.next;
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (10, 'Remove Duplicates from Sorted Array', 'guest', '<p>https://leetcode.com/problems/remove-duplicates-from-sorted-array/</p><pre><code class="language-java">class Solution {
    public int removeDuplicates(int[] nums) {
        int left = 0, right = 0; //two pointer
        while (right &lt; nums.length) {
            if (nums[left] != nums[right]) {
                left++;
                nums[left] = nums[right];
            }
            right++;
        }
        return left + 1;
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (11, '27. Remove Element', 'guest', '<p>先替换，后移动slow, index 0替换后移动到index 1, 共有1个数</p><p>https://leetcode.com/problems/remove-element/</p><pre><code class="language-java">class Solution {
    public int removeElement(int[] nums, int val) {
        int left = 0;
        int right = 0;
        while (right &lt; nums.length) {
            if (nums[right] != val) {
                nums[left] = nums[right];
                left++;
            }
            right++;
        }
        return left;
    }
}</code></pre>');
INSERT INTO note (ID, NOTE_NAME, USER_NAME, DESCRIPTION) VALUES (12, 'Another Account Test', 'coder', '<p>A note from another account</p>');
