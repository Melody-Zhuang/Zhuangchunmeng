// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = 'none';
    }
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 项目卡片折叠/展开功能
function toggleProject(header) {
    const projectCard = header.closest('.project-card');
    const content = projectCard.querySelector('.project-content');
    const allCards = document.querySelectorAll('.project-card');

    // 如果点击的不是当前展开的卡片，先关闭其他卡片
    allCards.forEach(card => {
        if (card !== projectCard && card.classList.contains('active')) {
            card.classList.remove('active');
            card.querySelector('.project-content').classList.add('collapsed');
        }
    });

    // 切换当前卡片的状态
    projectCard.classList.toggle('active');
    content.classList.toggle('collapsed');

    // 如果卡片展开，滚动到卡片位置
    if (projectCard.classList.contains('active')) {
        setTimeout(() => {
            const headerRect = header.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = scrollTop + headerRect.top - 100; // 100px的偏移量，避免顶部被导航栏遮挡

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 100);
    }
}

// 技能卡片悬停效果
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 荣誉卡片动画
document.querySelectorAll('.honor-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// 代码块复制功能
document.querySelectorAll('.code-block pre code').forEach(block => {
    block.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            // 显示复制成功提示
            const tooltip = document.createElement('div');
            tooltip.textContent = '复制成功！';
            tooltip.style.cssText = `
                position: absolute;
                background: #2c3e50;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s;
            `;

            this.parentElement.style.position = 'relative';
            this.parentElement.appendChild(tooltip);

            tooltip.style.opacity = '1';
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 300);
            }, 1000);
        });
    });
});

// 下载简历功能
function downloadResume() {
    // 创建一个链接元素
    const link = document.createElement('a');

    // 设置链接属性（使用实际的PDF文件路径）
    link.href = 'assets/庄春萌简历.pdf';
    link.download = '庄春萌简历.pdf';

    // 将链接添加到文档中
    document.body.appendChild(link);

    // 模拟点击
    link.click();

    // 从文档中移除链接
    document.body.removeChild(link);

    // 显示下载成功提示
    const downloadBtn = document.querySelector('.download-resume-btn');
    const originalText = downloadBtn.innerHTML;

    downloadBtn.innerHTML = '<i class="fas fa-check"></i> 下载成功';
    downloadBtn.style.backgroundColor = 'var(--resume-success)';

    // 创建一个浮动提示框
    const tooltip = document.createElement('div');
    tooltip.textContent = '简历已下载到您的设备';
    tooltip.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--resume-success);
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
    `;

    document.body.appendChild(tooltip);

    // 显示提示框
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(-50%) translateY(10px)';
    }, 100);

    // 恢复按钮原样式并移除提示框
    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.style.backgroundColor = '';
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateX(-50%) translateY(0)';
        setTimeout(() => tooltip.remove(), 300);
    }, 2000);
}